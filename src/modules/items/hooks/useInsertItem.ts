import { useNavigate, useParams } from 'react-router'
import { InsertItem } from '../../../shared/dtos/insertItem.dto'
import { useEffect, useState } from 'react'
import { ItemsRoutesEnum } from '../routes'
import { useItemReducer } from '../../../store/reducers/itemReducer/useItemReducer'
import { useGraphQLMutation } from '../../../shared/hooks/useGraphQLMutation'
import { CREATE_ITEM, UPDATE_ITEM } from '../../../shared/graphql/mutations/itemMutations'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_ITEM } from '../../../shared/graphql/queries/itemQueries'

const DEFAULT_ITEM = {
  name: '',
  quantityPeople: 0,
  price: 0,
  menuId: '',
  description: '',
}

export const useInsertItem = () => {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const [loadingItem, setLoadingItem] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const { item: itemReducer, setItem: setItemReducer } = useItemReducer()
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState<InsertItem>({
    name: '',
    quantityPeople: 0,
    price: 0,
    menuId: '',
    description: '',
  })

  const { executeQuery: getItem } = useGraphQLQuery({
    query: GET_ITEM,
    saveGlobal: setItemReducer,
  })

  const { mutate: createItem } = useGraphQLMutation({
    mutation: CREATE_ITEM,
    successMessage: 'Item Adicionado!',
    navigateTo: ItemsRoutesEnum.ITEM,
  })

  const { mutate: updateItem, loading } = useGraphQLMutation({
    mutation: UPDATE_ITEM,
    successMessage: 'Item modificado!',
    navigateTo: ItemsRoutesEnum.ITEM,
  })

  useEffect(() => {
    if (itemReducer) {
      setItem({
        name: itemReducer.name,
        price: itemReducer.price,
        quantityPeople: itemReducer.quantityPeople,
        description: itemReducer.description,
        menuId: itemReducer.menu.id,
      })
    }
  }, [itemReducer])

  useEffect(() => {
    const findItem = async () => {
      setLoadingItem(true)
      await getItem({
        variables: {
          data: `${itemId}`,
        },
      })
      setLoadingItem(false)
    }

    if (itemId) {
      setIsEdit(true)
      findItem()
    } else {
      setItemReducer(undefined)
      setItem(DEFAULT_ITEM)
    }
  }, [])

  useEffect(() => {
    if (item.name && item.menuId) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [item])

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setItem({
      ...item,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    })
  }

  const handleChangeSelect = (value: string) => {
    setItem({
      ...item,
      menuId: value,
    })
  }

  const handleClickCancel = () => {
    navigate(ItemsRoutesEnum.ITEM)
  }

  const handleInsertItem = async () => {
    if (itemId) {
      await updateItem({
        variables: {
          data: { ...item, id: itemId },
        },
      })
    } else {
      await createItem({
        variables: {
          data: item,
        },
      })
    }
  }

  return {
    item,
    loading,
    disabledButton,
    loadingItem,
    isEdit,
    onChangeInput,
    handleChangeSelect,
    handleClickCancel,
    handleInsertItem,
  }
}
