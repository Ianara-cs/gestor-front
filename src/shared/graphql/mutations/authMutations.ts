import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn ($data: SigninInput!){
    signIn(signinData: $data) {
      accessToken, refreshToken
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation RefreshToken ($data: String!){
    refreshToken(refreshTokenData: $data) {
      accessToken
    }
  }	
`