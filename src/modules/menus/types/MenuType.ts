interface ItemsIdType {
  id: string
}

export interface MenuType {
  id: string
  name: string
  category: string
  items?: ItemsIdType[]
}
