import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { URL_GRAPHQL } from '../../constants/urls'
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants'
import { getItemStorage } from './storageProxy'

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

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
