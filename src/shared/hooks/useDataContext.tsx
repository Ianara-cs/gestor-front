import { createContext, useContext, useState } from 'react'
import { MenuType } from '../../modules/menus/types/MenuType'
import { ItemType } from '../../modules/items/types/ItemType'

interface DataContext {
  menus?: MenuType[]
  items?: ItemType[]
}

interface DataContextProps {
  data: DataContext
  setData: (data: DataContext) => void
}

const DataContext = createContext({} as DataContextProps)

interface DataProviderProps {
  children: React.ReactNode
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataContext>({})
  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
}

export const useDataContext = () => {
  const { data, setData } = useContext(DataContext)

  const setMenus = (menus: MenuType[]) => {
    setData({
      ...data,
      menus: menus,
    })
  }

  const setItems = (items: ItemType[]) => {
    setData({
      ...data,
      items,
    })
  }

  return {
    menus: data?.menus || [],
    items: data?.items || [],
    setMenus: setMenus,
    setItems,
  }
}
