import { MenuType } from '../../menus/types/MenuType'

export interface ItemType {
  id: string
  name: string
  price: number
  imgUrl?: string
  quantityPeople: number
  description: string
  menu: Omit<MenuType, 'items'>
}
