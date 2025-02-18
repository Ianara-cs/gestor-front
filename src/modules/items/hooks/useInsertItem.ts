import { useNavigate } from 'react-router'
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext'
import { InsertItem } from '../../../shared/dtos/insertItem.dto'
import { useEffect, useState } from 'react'
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI'
import { URL_ITEM } from '../../../shared/constants/urls'
import { ItemsRoutesEnum } from '../routes'

export const useInsertItem = () => {
  const navigate = useNavigate()
  const { setNotification } = useGlobalContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const [item, setItem] = useState<InsertItem>({
    name: '',
    quantityPeople: 0,
    price: 0,
    menuId: '',
  })

  useEffect(() => {
    if (item.name && item.price && item.quantityPeople && item.menuId) {
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
    setLoading(true)
    await connectionAPIPost(URL_ITEM, item)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Item inserido com sucesso!')
        navigate(ItemsRoutesEnum.ITEM)
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error')
      })
    setLoading(false)
  }

  return {
    item,
    loading,
    disabledButton,
    onChangeInput,
    handleChangeSelect,
    handleClickCancel,
    handleInsertItem,
  }
}
