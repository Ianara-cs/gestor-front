import axios from "axios"
import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext"
import ConnectionAPI, { connectionAPIPost, MethodType } from "../functions/connection/connectionAPI"
import { useNavigate } from "react-router"
import { ProductRoutesEnum } from "../../modules/product/routes"
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
    body: unknown
  ): Promise<T | undefined> => {
    setLoading(true)
    const returnObject: T | undefined = await ConnectionAPI.connection<T>(url, method, body)
    .then((result) => {
      alert('Fez login')
      return result
    })
    .catch((error: Error) => {
      setNotification(error.message, 'error');
      return undefined;
    });

    setLoading(false)
    return returnObject
  }

  const postRequest = async (url: string, body: unknown) => {
    setLoading(true)
    const returnData = await connectionAPIPost(url, body).then((result) => {
      setNotification('Entrando', 'success');
      return result
    }).catch((error: Error) => {
      setNotification(error.message, 'error');
    })

    setLoading(false)
    return returnData
  }

  const authRequest = async (body: unknown) => {
    setLoading(true)
    await connectionAPIPost<AuthType>(URL_AUTH, body).then((result) => {
      setNotification('Entrando', 'success');
      navigate(ProductRoutesEnum.PRODUCT)
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
    postRequest
  }
}