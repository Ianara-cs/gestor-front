import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext"
import ConnectionAPI, { connectionAPIPost, MethodType } from "../functions/connection/connectionAPI"
import { useNavigate } from "react-router"
import { MenuRoutesEnum } from "../../modules/menus/routes"
import { AuthType } from "../../modules/login/types/AuthType"
import { URL_AUTH } from "../constants/urls"
import { ERROR_INVALID_PASSWORD } from "../constants/errosStatus"

export const useRequests = () => {
  const [ loading, setLoading ] = useState(false)
  const { setNotification } = useGlobalContext()
  const navigate = useNavigate()

  const request = async<T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown
  ): Promise<T | undefined> => {
    setLoading(true)
    const returnObject: T | undefined = await ConnectionAPI.connection<T>(url, method, body)
    .then((result) => {
      if (saveGlobal) {
        saveGlobal(result);
      }
      return result
    })
    .catch((error: Error) => {
      setNotification(error.message, 'error');
      return undefined;
    });

    setLoading(false)
    return returnObject
  }

  const authRequest = async (body: unknown) => {
    setLoading(true)
    await connectionAPIPost<AuthType>(URL_AUTH, body).then((result) => {
      setNotification('Entrando', 'success');
      navigate(MenuRoutesEnum.MENU)
      return result
    }).catch(() => {
      setNotification(ERROR_INVALID_PASSWORD, 'error');
    })

    setLoading(false)
  }

  return {
    loading,
    authRequest,
    request,
  }
}