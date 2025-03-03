import { gql } from '@apollo/client'

export const GET_ITEMS = gql`
  query getItems {
    items {
      id
      name
      price
      quantityPeople
      menu {
        name
      }
    }
  }
`

export const GET_ITEM = gql`
  query getItem($data: String!) {
    item(id: $data) {
      id
      name
      price
      description
      quantityPeople
      menu {
        id
        name
      }
    }
  }
`
