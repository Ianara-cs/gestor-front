import { useEffect, useState } from 'react'
import { useDataContext } from '../../../shared/hooks/useDataContext'
import { useRequests } from '../../../shared/hooks/useRequest'
import { ItemType } from '../types/ItemType'
import { URL_ITEM } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'
import { useNavigate } from 'react-router'
import { ItemsRoutesEnum } from '../routes'

export const useItem = () => {
  const { items, setItems } = useDataContext()
  const { request } = useRequests()
  const [itemsFiltered, setItemsFiltered] = useState<ItemType[]>([])
  const navigate = useNavigate()

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

  const handleOnClick = () => {
    navigate(ItemsRoutesEnum.ITEM_INSERT)
  }

  return {
    itemsFiltered,
    onSearch,
    handleOnClick,
  }
}
