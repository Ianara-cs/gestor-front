import { useEffect, useState } from 'react'
import { ItemType } from '../types/ItemType'
import { useNavigate } from 'react-router'
import { ItemsRoutesEnum } from '../routes'
import { useItemReducer } from '../../../store/reducers/itemReducer/useItemReducer'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_ITEMS } from '../../../shared/graphql/queries/itemQueries'
import { useGraphQLMutation } from '../../../shared/hooks/useGraphQLMutation'
import { DELETE_ITEM } from '../../../shared/graphql/mutations/itemMutations'

export const useItem = () => {
  const [itemIdDelete, setItemIdDelete] = useState<string | undefined>()
  const { items, setItems } = useItemReducer()
  const [itemsFiltered, setItemsFiltered] = useState<ItemType[]>([])
  const navigate = useNavigate()

  const { executeQuery: getItems } = useGraphQLQuery({
    query: GET_ITEMS,
    isPaginate: true,
    saveGlobal: setItems,
  })

  const { mutate: deleteItem } = useGraphQLMutation({
    mutation: DELETE_ITEM,
    successMessage: 'Item deletado!',
  })

  useEffect(() => {
    setItemsFiltered([...items])
  }, [items])

  useEffect(() => {
    getItems()
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
    await deleteItem({
      variables: {
        data: itemIdDelete,
      },
    })
    setItemIdDelete(undefined)
    await getItems()
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
