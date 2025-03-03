import { gql } from '@apollo/client'

export const CREATE_ITEM = gql`
  mutation CreateItem($data: CreateItemInput!) {
    createItem(createItemData: $data) {
      id
    }
  }
`

export const DELETE_ITEM = gql`
  mutation DeleteItem($data: String!) {
    deleteItem(id: $data) {
      id
    }
  }
`
