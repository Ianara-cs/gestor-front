import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { MenuType } from '../../../modules/menus/types/MenuType'
import { setMenuActions, setMenusActions } from '.'

export const useMenuReducer = () => {
  const { menus, menu } = useAppSelector((state) => state.menuReducer)
  const dispatch = useDispatch()

  const setMenus = (currentMenus: MenuType[]) => {
    dispatch(setMenusActions(currentMenus))
  }

  const setMenu = (currentMenu?: MenuType) => {
    dispatch(setMenuActions(currentMenu))
  }

  return {
    menus,
    menu,
    setMenus,
    setMenu,
  }
}
