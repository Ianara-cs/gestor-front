import axios from "axios"
import { useState } from "react"
import { useGlobalContext } from "./useGlobalContext"
import { connectionAPIPost } from "../functions/connection/connectionAPI"
import { useNavigate } from "react-router"
import { ProductRoutesEnum } from "../../modules/product/routes"
import { AuthType } from "../../modules/login/types/AuthType"
import { URL_AUTH } from "../constants/urls"
import { ERROR_INVALID_PASSWORD } from "../constants/errosStatus"

export const useRequests = () => {
  const [ loading, setLoading ] = useState(false)
  const { setNotification } = useGlobalContext()
  const navigate = useNavigate()

  const getRequest = async (url: string) => {
    setLoading(true)
    const returnData = await axios({
      method: 'get',
      url: url,
    }).then((result) => {
      alert('Fez login')
      return result.data
    }).catch(() => {
      alert('Erro');
    })

    setLoading(false)
    return returnData
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
    getRequest,
    postRequest
  }
}