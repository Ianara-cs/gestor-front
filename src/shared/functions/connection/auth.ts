import { NavigateFunction, redirect } from 'react-router'
import { UserType } from '../../../modules/login/types/UserType'
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants'
import { URL_AUTH } from '../../constants/urls'
import { connectionAPIGet } from './connectionAPI'
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy'
import { LoginRoutesEnum } from '../../../modules/login/routes'

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY)

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token)
  }
}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY)

export const verifyLoggedIn = async () => {
  const token = true //getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  const user = await connectionAPIGet<UserType>(URL_AUTH).catch(() => {
    unsetAuthorizationToken()
  })

  if (!user) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  return null
}

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken()
  navigate(LoginRoutesEnum.LOGIN)
}
