import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query Users {
    users {
      id
      name
      role
      username
      isActive
    }
  }
`
