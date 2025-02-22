import { RouteObject } from 'react-router'
import MenuScreen from './screens/MenuScreen'
import MenuInsert from './screens/MenuInsert'

export enum MenuRoutesEnum {
  MENUS = '/menus',
  MENU_INSERT = '/menus/insert',
  MENU_EDIT = '/menus/:menuId',
}

export const menuScreens: RouteObject[] = [
  {
    path: MenuRoutesEnum.MENUS,
    element: <MenuScreen />,
  },
  {
    path: MenuRoutesEnum.MENU_INSERT,
    element: <MenuInsert />,
  },
  {
    path: MenuRoutesEnum.MENU_EDIT,
    element: <MenuInsert />,
  },
]
