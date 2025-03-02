import { useEffect, useState } from 'react'
import { MenuType } from '../types/MenuType'
import { URL_MENU_ID } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'
import { MenuRoutesEnum } from '../routes'
import { useRequests } from '../../../shared/hooks/useRequest'
import { useNavigate } from 'react-router'
import { useMenuReducer } from '../../../store/reducers/menuReducer/useMenuReducer'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_MENU } from '../../../shared/graphql/queries/menuQueries'

export const useMenu = () => {
  const [menuIdDelete, setMenuIdDelete] = useState<string | undefined>()
  const { menus, setMenus } = useMenuReducer()
  const { request } = useRequests()
  const [menusFiltered, setMenusFiltered] = useState<MenuType[]>([])
  const navigate = useNavigate()
  const { loading } = useGraphQLQuery({ query: GET_MENU, saveGlobal: setMenus })

  useEffect(() => {
    setMenusFiltered([...menus])
  }, [menus])

  const handleOnClick = () => {
    navigate(MenuRoutesEnum.MENU_INSERT)
  }

  const onSearch = (value: string) => {
    if (!value) {
      setMenusFiltered([...menus])
    } else {
      setMenusFiltered([...menusFiltered.filter((menu) => menu.name.includes(value))])
    }
  }

  const handleEditMenu = async (menuId: string) => {
    navigate(MenuRoutesEnum.MENU_EDIT.replace(':menuId', `${menuId}`))
  }

  const handleDeleteMenu = async () => {
    await request(
      URL_MENU_ID.replace('{menuId}', `${menuIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Cardápio deletado!',
    )
    setMenuIdDelete(undefined)
  }

  const handleCloseModalDelete = () => {
    setMenuIdDelete(undefined)
  }

  const handleOpenModalDelete = (menuId: string) => {
    setMenuIdDelete(menuId)
  }

  return {
    menusFiltered,
    openModalDelete: !!menuIdDelete,
    loading,
    handleOnClick,
    onSearch,
    handleDeleteMenu,
    handleEditMenu,
    handleOpenModalDelete,
    handleCloseModalDelete,
  }
}
