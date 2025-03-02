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

export const DELETE_MENU = gql`
  mutation DeleteMenu($data: String!) {
    deleteMenu(id: $data) {
      id
    }
  }
`

export const UPDATE_MENU = gql`
  mutation UpdateMenu($data: UpdateMenuInput!) {
    updateMenu(updateMenuData: $data) {
      id
    }
  }
`
