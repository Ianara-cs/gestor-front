import { gql } from '@apollo/client'

export const DELETE_ITEM = gql`
  mutation DeleteItem($data: String!) {
    deleteItem(id: $data) {
      id
    }
  }
`
