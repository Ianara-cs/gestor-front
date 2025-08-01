import { useEffect, useState } from 'react'
import { InsertMenu } from '../../../shared/dtos/insertMenu.dto'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../routes'
import { useMenuReducer } from '../../../store/reducers/menuReducer/useMenuReducer'
import { useGraphQLMutation } from '../../../shared/hooks/useGraphQLMutation'
import { CREATE_MENU, UPDATE_MENU } from '../../../shared/graphql/mutations/menuMutations'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_MENU } from '../../../shared/graphql/queries/menuQueries'

const DEFAULT_MENU = {
  name: '',
  category: '',
}

export const useInsertMenu = (menuId?: string) => {
  const navigate = useNavigate()
  const { menu: menuReducer, setMenu: setMenuReducer } = useMenuReducer()
  const [menu, setMenu] = useState<InsertMenu>({
    name: '',
    category: '',
  })
  const [loadingMenu, setLoadingMenu] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
  const [isEdit, setIsEdit] = useState(false)

  const { mutate: createMenu } = useGraphQLMutation({
    mutation: CREATE_MENU,
    successMessage: 'Cardápio criado!',
    navigateTo: MenuRoutesEnum.MENUS,
  })

  const { executeQuery: getMenu } = useGraphQLQuery({
    query: GET_MENU,
    saveGlobal: setMenuReducer,
  })

  const { mutate: updateMenu, loading } = useGraphQLMutation({
    mutation: UPDATE_MENU,
    successMessage: 'Cardápio modificado!',
    navigateTo: MenuRoutesEnum.MENUS,
  })

  useEffect(() => {
    if (menuReducer) {
      setMenu({
        name: menuReducer.name,
        category: menuReducer.category,
      })
    }
  }, [menuReducer])

  useEffect(() => {
    const findMenu = async () => {
      setLoadingMenu(true)
      await getMenu({
        variables: { data: menuId },
      })
      setLoadingMenu(false)
    }

    if (menuId) {
      setIsEdit(true)
      findMenu()
    } else {
      setMenuReducer(undefined)
      setMenu(DEFAULT_MENU)
    }
  }, [menuId])

  useEffect(() => {
    if (menu.name && menu.category) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [menu])

  const handleChange = (value: string) => {
    setMenu({
      ...menu,
      category: value,
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setMenu({
      ...menu,
      [nameObject]: event.target.value,
    })
  }

  const handleClickCancel = () => {
    navigate(MenuRoutesEnum.MENUS)
  }

  const handleInsertMenu = async () => {
    if (menuId) {
      await updateMenu({
        variables: {
          data: { ...menu, id: menuId },
        },
      })
    } else {
      await createMenu({
        variables: {
          data: menu,
        },
      })
    }
  }

  return {
    handleChange,
    onChange,
    handleClickCancel,
    handleInsertMenu,
    isEdit,
    menu,
    loading,
    disabledButton,
    loadingMenu,
  }
}
