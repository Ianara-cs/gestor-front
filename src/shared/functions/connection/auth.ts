import { NavigateFunction, redirect } from 'react-router'
import { AUTHORIZATION_KEY, REFRESH_TOKEN } from '../../constants/authorizationConstants'
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy'
import { LoginRoutesEnum } from '../../../modules/login/routes'
import { fetchUser } from './connectionGraphQL'
import { store } from '../../../store/store'

export const unsetAuthorizationToken = (key: string) => removeItemStorage(key)

export const setAuthorizationToken = (key: string ,token?: string) => {
  if (token) {
    setItemStorage(key, token)
  }
}

export const getAuthorizationToken = (key: string) => getItemStorage(key)

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken(AUTHORIZATION_KEY);
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  const user = store.getState().globalReducer.user 

  if (user) {
    return null
  }

  try {
    const user = await fetchUser()

    if (!user) {
      return redirect(LoginRoutesEnum.LOGIN)
    }
  } catch(error) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  return null
}

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken(AUTHORIZATION_KEY)
  unsetAuthorizationToken(REFRESH_TOKEN)
  navigate(LoginRoutesEnum.LOGIN)
}
