import { useEffect, useState } from 'react'
import { useDataContext } from '../../../shared/hooks/useDataContext'
import { useRequests } from '../../../shared/hooks/useRequest'
import { ItemType } from '../types/ItemType'
import { URL_ITEM } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'

export const useItem = () => {
  const { items, setItems } = useDataContext()
  const { request } = useRequests()
  const [itemsFiltered, setItemsFiltered] = useState<ItemType[]>([])

  useEffect(() => {
    setItemsFiltered([...items])
  }, [items])

  useEffect(() => {
    request(URL_ITEM, MethodsEnum.GET, setItems)
  }, [])

  const onSearch = (value: string) => {
    if (!value) {
      setItemsFiltered([...items])
    } else {
      setItemsFiltered([...itemsFiltered.filter((item) => item.name.includes(value))])
    }
  }

  return {
    itemsFiltered,
    onSearch,
  }
}
