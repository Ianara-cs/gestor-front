import { RouteObject } from 'react-router'
import ItemsScreen from './screens/ItemsScreen'
import ItemInsert from './screens/ItemInsert'

export enum ItemsRoutesEnum {
  ITEM = '/itens',
  ITEM_INSERT = '/item/inserir',
  ITEM_EDIT = '/item/editar/:itemId',
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
  {
    path: ItemsRoutesEnum.ITEM_EDIT,
    element: <ItemInsert />,
  },
]
