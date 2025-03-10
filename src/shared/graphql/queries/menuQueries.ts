import { gql } from '@apollo/client'

export const GET_MENUS = gql`
  query Menus($page: Int, $take: Int) {
    menus(take: $take, page: $page) {
      result {
        id
        name
        category
        items {
          id
        }
      }
      total
      hasNextPage
    }
  }
`

export const GET_MENU = gql`
  query Menu($data: String!) {
    menu(id: $data) {
      id
      name
      category
    }
  }
`
