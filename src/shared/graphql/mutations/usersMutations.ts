import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(createUserData: $data) {
      id
      name
      username
      role
      createdAt
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($data: String!) {
    deleteUser(id: $data) {
      id
    }
  }
`

export const DISABLE_USER = gql`
  mutation DisableUser($data: DisableUserInput!) {
    disableUser(disableUserData: $data) {
      id
      isActive
    }
  }
`
