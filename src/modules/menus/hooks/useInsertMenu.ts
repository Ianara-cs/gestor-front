import { useEffect, useState } from 'react'
import { InsertMenu } from '../../../shared/dtos/insertMenu.dto'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../routes'
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext'
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI'
import { URL_MENU } from '../../../shared/constants/urls'

export const useInsertMenu = () => {
  const navigate = useNavigate()
  const { setNotification } = useGlobalContext()
  const [menu, setMenu] = useState<InsertMenu>({
    name: '',
    category: '',
  })
  const [loading, setLoading] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)

  useEffect(() => {
    if (menu.name && menu.category) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [menu])

  const handleChange = (value: string) => {
    setMenu({
      ...menu,
      category: value,
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setMenu({
      ...menu,
      [nameObject]: event.target.value,
    })
  }

  const handleClickCancel = () => {
    navigate(MenuRoutesEnum.MENU)
  }

  const handleInsertMenu = async () => {
    if (!menu.name && !menu.category) {
      setNotification('Campos vazios!', 'warning', '"nome" e "categoria" não podem ser vazios')
    } else {
      setLoading(true)
      await connectionAPIPost(URL_MENU, menu)
        .then(() => {
          setNotification('Sucesso!', 'success', 'Menu inserido com sucesso!')
          navigate(MenuRoutesEnum.MENU)
        })
        .catch((error: Error) => {
          setNotification(error.message, 'error')
        })
      setLoading(false)
    }
  }

  return {
    handleChange,
    onChange,
    handleClickCancel,
    handleInsertMenu,
    menu,
    loading,
    disabledButton,
  }
}
