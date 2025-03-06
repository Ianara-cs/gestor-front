import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  createHttpLink,
  fromPromise,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { URL_GRAPHQL } from '../../constants/urls'
import { AUTHORIZATION_KEY, REFRESH_TOKEN } from '../../constants/authorizationConstants'
import { getItemStorage } from './storageProxy'
import { WHO_AM_I } from '../../graphql/queries/authQueries'
import { onError } from '@apollo/client/link/error'
import { LoginRoutesEnum } from '../../../modules/login/routes'
import { getAuthorizationToken, setAuthorizationToken, unsetAuthorizationToken } from './auth'
import { connectionAPIPost } from './connectionAPI'
import { TokensType } from '../../types/TokensType'

const httpLink = createHttpLink({
  uri: URL_GRAPHQL,
})

const authLink = setContext((_, { headers }) => {
  const token = getItemStorage(AUTHORIZATION_KEY)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const getNewToken = async () => {
  try {
    const refreshToken = getAuthorizationToken(REFRESH_TOKEN)
    if (!refreshToken) throw new Error('Refresh token não encontrado')

    const response = await connectionAPIPost<Omit<TokensType, 'refresh_token'>>(
      URL_GRAPHQL,
      JSON.stringify({
        query: REFRESH_TOKEN,
        variables: { refreshToken },
      }),
    )
    const { accessToken } = response
    if (!accessToken) throw new Error('Falha ao obter novo access token')

    setAuthorizationToken(AUTHORIZATION_KEY, accessToken)
    return `Bearer ${accessToken}`
  } catch (error) {
    unsetAuthorizationToken(AUTHORIZATION_KEY)
    unsetAuthorizationToken(REFRESH_TOKEN)
    window.location.href = LoginRoutesEnum.LOGIN
    return null
  }
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            return fromPromise(
              getNewToken().catch((error) => {
                return Promise.reject(error)
              }),
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                })

                return forward(operation)
              })
        }
      }
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

export const fetchUser = async () => {
  try {
    const { data } = await apolloClient.query({
      query: WHO_AM_I,
      fetchPolicy: 'network-only',
    })
    return data
  } catch (error) {
    return null
  }
}
