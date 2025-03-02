import { gql } from "@apollo/client";

export const GET_MENU = gql`
  query getMenus {
    menus {
      id
      name
      category
    }
  }
`