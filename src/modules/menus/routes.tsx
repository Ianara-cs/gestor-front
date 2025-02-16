import { RouteObject } from 'react-router'
import MenuScreen from './screens/MenuScreen'
import MenuInsert from './screens/MenuInsert'

export enum MenuRoutesEnum {
  MENU = '/menus',
  MENUS_INSERT = '/menus/insert',
}

export const menuScreens: RouteObject[] = [
  {
    path: MenuRoutesEnum.MENU,
    element: <MenuScreen />,
  },
  {
    path: MenuRoutesEnum.MENUS_INSERT,
    element: <MenuInsert />,
  },
]
