import { Spin } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { unsetAuthorizationToken } from "../../../shared/functions/connection/auth"
import { MenuRoutesEnum } from "../../menus/routes"
import { LoginRoutesEnum } from "../../login/routes"
import { connectionAPIGet } from "../../../shared/functions/connection/connectionAPI"
import { URL_USER } from "../../../shared/constants/urls"

const FirstScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      const token = true //getAuthorizationToken()
      if(token) {
        await connectionAPIGet(URL_USER,)
        .then(() => {
          navigate(MenuRoutesEnum.MENU)
        })
        .catch(() => {
          unsetAuthorizationToken()
          // navigate(LoginRoutesEnum.LOGIN)
          navigate(MenuRoutesEnum.MENU)
        })
      } else {
        navigate(LoginRoutesEnum.LOGIN)
      }
    }

    verifyToken()
  }, [])

  return <Spin />
}

export default FirstScreen