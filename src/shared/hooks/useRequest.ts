import { useState } from 'react'
import { useGlobalContext } from './useGlobalContext'
import ConnectionAPI, {
  connectionAPIGet,
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionAPI'
import { NavigateFunction } from 'react-router'
import { AuthType } from '../../modules/login/types/AuthType'
import { URL_AUTH, URL_USER } from '../constants/urls'
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus'
import { UserType } from '../../modules/login/types/UserType'
import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes'

export const useRequests = () => {
  const [loading, setLoading] = useState(false)
  const { setNotification, setUser } = useGlobalContext()

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true)
    const returnObject: T | undefined = await ConnectionAPI.connection<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result)
        }
        return result
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error')
        return undefined
      })

    setLoading(false)
    return returnObject
  }

  const authRequest = async (body: unknown, navigate: NavigateFunction): Promise<void> => {
    setLoading(true)
    // Simulando um login
    // await connectionAPIPost<AuthType>(URL_AUTH, body).then((result) => {
    await connectionAPIGet<UserType>(URL_USER)
      .then((result) => {
        setUser(result)
        setNotification('Entrando', 'success')
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN)
        return result
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error')
      })

    setLoading(false)
  }

  return {
    loading,
    authRequest,
    request,
  }
}
