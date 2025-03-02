import { gql } from "@apollo/client";

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