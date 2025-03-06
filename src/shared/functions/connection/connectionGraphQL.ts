import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { URL_GRAPHQL } from '../../constants/urls'
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants'
import { getItemStorage } from './storageProxy'
import { WHO_AM_I } from '../../graphql/queries/authQueries'

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
