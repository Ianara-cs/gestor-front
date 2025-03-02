import { gql } from '@apollo/client'

export const CREATE_MENU = gql`
  mutation CreateMenu($data: CreateMenuInput!) {
    createMenu(createMenuData: $data) {
      id
      name
      category
    }
  }
`
