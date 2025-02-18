import { useState } from 'react'
import Button from '../../../shared/components/buttons/button/button'
import Input from '../../../shared/components/inputs/input/input'
import InputMoney from '../../../shared/components/inputs/inputMoney/inputMoney'
import Select from '../../../shared/components/inputs/select/select'
import Screen from '../../../shared/components/screen/Screen'
import {
  DisplayFlexJustifyRight,
  FlexJustifyCenter,
} from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import { useMenu } from '../../menus/hooks/useMenu'
import { InsertItem } from '../../../shared/dtos/insertItem.dto'
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI'
import { URL_ITEM } from '../../../shared/constants/urls'
import { useNavigate } from 'react-router'
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext'
import { ItemsRoutesEnum } from '../routes'

const ItemInsert = () => {
  const { menusFiltered } = useMenu()
  const navigate = useNavigate()
  const { setNotification } = useGlobalContext()
  const [item, setItem] = useState<InsertItem>({
    name: '',
    quantityPeople: 0,
    price: 0,
    menuId: '',
  })

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

  const handleInsertItem = async () => {
    await connectionAPIPost(URL_ITEM, item)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Item inserido com sucesso!')
        navigate(ItemsRoutesEnum.ITEM)
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error')
      })
  }

  return (
    <Screen>
      <FlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChangeInput(event, 'name')}
            margin={'0px 0px 16px 0px'}
            title="Nome"
            placeholder="Nome"
            value={item.name}
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'price', true)}
            margin={'0px 0px 16px 0px'}
            title="Preço"
            placeholder="Preço"
            value={item.price}
          />
          <Input
            type="number"
            min={1}
            onChange={(event) => onChangeInput(event, 'quantityPeople', true)}
            margin={'0px 0px 16px 0px'}
            title="Quantidade de Pessoas"
            placeholder="Digite a quantidade de pessoas"
            value={item.quantityPeople}
          />
          <Select
            title="Menu"
            margin={'0px 0px 32px 0px'}
            placeholder="Escolha uma categoria"
            style={{ width: '100%' }}
            onChange={handleChangeSelect}
            options={menusFiltered.map((menu) => ({
              value: `${menu.id}`,
              label: `${menu.name}`,
            }))}
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger>Cancelar</Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                // loading={loading}
                // disabled={disabledButton}
                onClick={handleInsertItem}
                type="primary"
              >
                Inserir Menu
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </FlexJustifyCenter>
    </Screen>
  )
}

export default ItemInsert
