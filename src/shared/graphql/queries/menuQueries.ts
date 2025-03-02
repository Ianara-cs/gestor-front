import { gql } from '@apollo/client'

export const GET_MENUS = gql`
  query getMenus {
    menus {
      id
      name
      category
      items {
        id
      }
    }
  }
`

export const GET_MENU = gql`
  query Menu($data: String!){
    menu(id: $data) {
      id,
      name,
      category,
    }
  }
`
