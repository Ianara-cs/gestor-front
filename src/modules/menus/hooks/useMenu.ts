import { useEffect, useState } from 'react'
import { MenuType } from '../types/MenuType'
import { URL_MENU } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'
import { MenuRoutesEnum } from '../routes'
import { useRequests } from '../../../shared/hooks/useRequest'
import { useNavigate } from 'react-router'
import { useMenuReducer } from '../../../store/reducers/menuReducer/useMenuReducer'

export const useMenu = () => {
  const { menus, setMenus } = useMenuReducer()
  const { request } = useRequests()
  const [menusFiltered, setMenusFiltered] = useState<MenuType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setMenusFiltered([...menus])
  }, [menus])

  useEffect(() => {
    request<MenuType[]>(URL_MENU, MethodsEnum.GET, setMenus)
  }, [])

  const handleOnClick = () => {
    navigate(MenuRoutesEnum.MENUS_INSERT)
  }

  const onSearch = (value: string) => {
    if (!value) {
      setMenusFiltered([...menus])
    } else {
      setMenusFiltered([...menusFiltered.filter((menu) => menu.name.includes(value))])
    }
  }

  return {
    menusFiltered,
    handleOnClick,
    onSearch,
  }
}
