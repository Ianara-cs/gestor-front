import { gql } from '@apollo/client'

export const GET_ITEMS = gql`
  query Items($page: Int, $take: Int) {
    items(take: $take, page: $page) {
      result {
        id
        name
        price
        quantityPeople
        description
        menu {
          name
        }
      }
      total
      hasNextPage
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
