import { useEffect, useState } from "react"
import { SignIn } from "../../../shared/dtos/login.dto"
import { useGraphQLMutation } from "../../../shared/hooks/useGraphQLMutation"
import { SIGN_IN } from "../../../shared/graphql/mutations/authMutations"
import { FirstScreenRoutesEnum } from "../../firstScreen/routes"
import { TokensType } from "../../../shared/types/TokensType"
import { setAuthorizationToken } from "../../../shared/functions/connection/auth"
import { AUTHORIZATION_KEY, REFRESH_TOKEN } from "../../../shared/constants/authorizationConstants"

export const useLogin = () => {
  const [tokens, setTokens] = useState<TokensType>({
    accessToken: '',
    refreshToken: '',
  })
  const [signIn, setSignIn] = useState<SignIn>({
    username: '',
    password: '',
  })

  const {mutate: login, loading } = useGraphQLMutation({
    mutation: SIGN_IN,
    navigateTo: FirstScreenRoutesEnum.FIRST_SCREEN,
    saveGlobal: setTokens,
  })

  useEffect(() => {
    setAuthorizationToken(AUTHORIZATION_KEY,tokens.accessToken)
    setAuthorizationToken(REFRESH_TOKEN,tokens.refreshToken)
  }, [tokens.accessToken, tokens.refreshToken])

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
  ) => {
    setSignIn({
      ...signIn,
      [nameObject]: event.target.value,
    })
  }

  const handleLogin = async () => {
    login({
      variables: {
        data: {
          ...signIn
        }
      }
    })
  }

  return {
    signIn,
    loading,
    onChangeInput,
    handleLogin,
  }

}