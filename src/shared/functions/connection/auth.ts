import { NavigateFunction, redirect } from 'react-router'
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants'
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy'
import { LoginRoutesEnum } from '../../../modules/login/routes'
import { fetchUser } from './connectionGraphQL'

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY)

export const setAuthorizationToken = (key: string ,token?: string) => {
  if (token) {
    setItemStorage(key, token)
  }
}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY)

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  const user = await fetchUser()

  if (!user) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  return null
}

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken()
  navigate(LoginRoutesEnum.LOGIN)
}
