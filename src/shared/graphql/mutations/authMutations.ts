import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn ($data: SigninInput!){
    signIn(signinData: $data) {
      accessToken, refreshToken
    }
  }
`