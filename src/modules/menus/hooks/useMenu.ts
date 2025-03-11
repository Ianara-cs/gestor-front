import { useEffect, useState } from 'react'
import { MenuType } from '../types/MenuType'
import { MenuRoutesEnum } from '../routes'
import { useNavigate } from 'react-router'
import { useMenuReducer } from '../../../store/reducers/menuReducer/useMenuReducer'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_MENUS } from '../../../shared/graphql/queries/menuQueries'
import { useGraphQLMutation } from '../../../shared/hooks/useGraphQLMutation'
import { DELETE_MENU } from '../../../shared/graphql/mutations/menuMutations'

export const useMenu = () => {
  const [menuIdDelete, setMenuIdDelete] = useState<string | undefined>()
  const { menus, setMenus } = useMenuReducer()
  const [menusFiltered, setMenusFiltered] = useState<MenuType[]>([])
  const navigate = useNavigate()
  const { executeQuery, loading, refetch } = useGraphQLQuery({
    query: GET_MENUS,
    isPaginate: true,
    saveGlobal: setMenus,
  })
  const { mutate: deleteMenu } = useGraphQLMutation({
    mutation: DELETE_MENU,
    successMessage: 'Cardápio deletado!',
  })

  useEffect(() => {
    executeQuery()
  }, [])

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

  const changePage = async (page: number, pageSize: number) => {
    await executeQuery({ variables: { page, take: pageSize } })
  }

  const handleEditMenu = async (menuId: string) => {
    navigate(MenuRoutesEnum.MENU_EDIT.replace(':menuId', `${menuId}`))
  }

  const handleDeleteMenu = async () => {
    await deleteMenu({
      variables: {
        data: menuIdDelete,
      },
    })
    setMenuIdDelete(undefined)
    await refetch()
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
    changePage,
  }
}
