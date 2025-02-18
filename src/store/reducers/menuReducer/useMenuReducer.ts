import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { MenuType } from '../../../modules/menus/types/MenuType'
import { setMenusActions } from '.'

export const useMenuReducer = () => {
  const { menus } = useAppSelector((state) => state.menuReducer)
  const dispatch = useDispatch()

  const setMenus = (currentMenus: MenuType[]) => {
    dispatch(setMenusActions(currentMenus))
  }

  return {
    menus,
    setMenus,
  }
}
