import { RouteObject } from 'react-router'
import ItemsScreen from './screens/ItemsScreen'

export enum ItemsRoutesEnum {
  ITEM = '/itens',
}

export const itemsScreens: RouteObject[] = [
  {
    path: ItemsRoutesEnum.ITEM,
    element: <ItemsScreen />,
  },
]