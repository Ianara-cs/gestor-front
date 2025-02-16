import { Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../../menus/routes'

const FirstScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(MenuRoutesEnum.MENU)
  }, [])

  return <Spin />
}

export default FirstScreen
