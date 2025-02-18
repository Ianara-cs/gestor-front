import { RouteObject } from 'react-router'
import ItemsScreen from './screens/ItemsScreen'
import ItemInsert from './screens/ItemInsert'

export enum ItemsRoutesEnum {
  ITEM = '/itens',
  ITEM_INSERT = '/itens/inserir',
}

export const itemsScreens: RouteObject[] = [
  {
    path: ItemsRoutesEnum.ITEM,
    element: <ItemsScreen />,
  },
  {
    path: ItemsRoutesEnum.ITEM_INSERT,
    element: <ItemInsert />,
  },
]
