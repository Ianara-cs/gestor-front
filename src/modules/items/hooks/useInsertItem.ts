import { useNavigate, useParams } from 'react-router'
import { InsertItem } from '../../../shared/dtos/insertItem.dto'
import { useEffect, useState } from 'react'
import { URL_ITEM, URL_ITEM_ID } from '../../../shared/constants/urls'
import { ItemsRoutesEnum } from '../routes'
import { useRequests } from '../../../shared/hooks/useRequest'
import { MethodsEnum } from '../../../shared/enums/methods.enum'
import { useItemReducer } from '../../../store/reducers/itemReducer/useItemReducer'

const DEFAULT_ITEM = {
  name: '',
  quantityPeople: 0,
  price: 0,
  menuId: '',
}

export const useInsertItem = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate()
  const {request, loading} = useRequests()
  const [loadingItem, setLoadingItem] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const {item : itemReducer, setItem: setItemReducer} = useItemReducer()
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState<InsertItem>({
    name: '',
    quantityPeople: 0,
    price: 0,
    menuId: '',
  })

  useEffect(() => {
    if(itemReducer) {
      setItem({
        name: itemReducer.name,
        price: itemReducer.price,
        quantityPeople: itemReducer.quantityPeople,
        menuId: itemReducer.menuId
      })
    }
  }, [itemReducer])

  useEffect(() => {
    const findItem = async() => {
      setLoadingItem(true)
      await request(
        URL_ITEM_ID.replace('{itemId}', `${itemId}`), 
        MethodsEnum.GET, 
        setItemReducer
      )
      setLoadingItem(false)
    }

    if(itemId) {
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
    event: React.ChangeEvent<HTMLInputElement>,
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
    if(itemId) {
      await request(
        URL_ITEM_ID.replace('{itemId}', itemId), 
        MethodsEnum.PUT,
        undefined,
        item,
        'Item Modificado!'
      )
    } else {
      await request(
        URL_ITEM, MethodsEnum.POST, 
        undefined, 
        item, 
        'Item Adicionado!'
      )
    }
    navigate(ItemsRoutesEnum.ITEM)
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
