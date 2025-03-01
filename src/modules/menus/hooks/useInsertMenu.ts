import { useEffect, useState } from 'react'
import { InsertMenu } from '../../../shared/dtos/insertMenu.dto'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../routes'
import { URL_MENU, URL_MENU_ID } from '../../../shared/constants/urls'
import { useRequests } from '../../../shared/hooks/useRequest'
import { useMenuReducer } from '../../../store/reducers/menuReducer/useMenuReducer'
import { MethodsEnum } from '../../../shared/enums/methods.enum'

const DEFAULT_MENU = {
  name: '',
  category: '',
}

export const useInsertMenu = (menuId?: string) => {
  const navigate = useNavigate()
  const { request, loading } = useRequests()
  const { menu: menuReducer, setMenu: setMenuReducer } = useMenuReducer()
  const [menu, setMenu] = useState<InsertMenu>({
    name: '',
    category: '',
  })
  const [loadingMenu, setLoadingMenu] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
  const [isEdit, setIsEdit] = useState(false)

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
      await request(URL_MENU_ID.replace('{menuId}', `${menuId}`), MethodsEnum.GET, setMenuReducer)
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
      await request(
        URL_MENU_ID.replace('{menuId}', menuId),
        MethodsEnum.PUT,
        undefined,
        menu,
        'Cardápio modificado!',
      )
    } else {
      await request(URL_MENU, MethodsEnum.POST, undefined, menu, 'Cardápio criado!')
    }
    navigate(MenuRoutesEnum.MENUS)
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
