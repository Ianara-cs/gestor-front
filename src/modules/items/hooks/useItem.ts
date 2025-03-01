import { useEffect, useState } from 'react'
import { useRequests } from '../../../shared/hooks/useRequest'
import { ItemType } from '../types/ItemType'
import { URL_ITEM, URL_ITEM_ID } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'
import { useNavigate } from 'react-router'
import { ItemsRoutesEnum } from '../routes'
import { useItemReducer } from '../../../store/reducers/itemReducer/useItemReducer'

export const useItem = () => {
  const [itemIdDelete, setItemIdDelete] = useState<string | undefined>()
  const { items, setItems } = useItemReducer()
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

  const handleEditItem = (itemId: string) => {
    navigate(ItemsRoutesEnum.ITEM_EDIT.replace(':itemId', `${itemId}`))
  }

  const handleOpenModalDelete = (itemId: string) => {
    setItemIdDelete(itemId)
  }

  const handleDeleteItem = async () => {
    await request(
      URL_ITEM_ID.replace('{itemId}', `${itemIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Item deletado!',
    )
    await request(URL_ITEM, MethodsEnum.GET, setItems)
    setItemIdDelete(undefined)
  }

  const handleCloseModalDelete = () => {
    setItemIdDelete(undefined)
  }

  return {
    itemsFiltered,
    openModalDelete: !!itemIdDelete,
    onSearch,
    handleOnClick,
    handleEditItem,
    handleDeleteItem,
    handleCloseModalDelete,
    handleOpenModalDelete,
  }
}
