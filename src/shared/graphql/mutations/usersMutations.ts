import { gql } from '@apollo/client'

export const DELETE_USER = gql`
  mutation DeleteUser($data: String!) {
    deleteUser(id: $data) {
      id
    }
  }
`
