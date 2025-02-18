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
import { useInsertItem } from '../hooks/useInsertItem'
import { ItemsRoutesEnum } from '../routes'

const ItemInsert = () => {
  const { menusFiltered } = useMenu()
  const {
    item,
    loading,
    disabledButton,
    handleChangeSelect,
    handleInsertItem,
    handleClickCancel,
    onChangeInput,
  } = useInsertItem()

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'HOME',
        },
        {
          title: 'ITENS',
          href: ItemsRoutesEnum.ITEM,
        },
        {
          title: 'INSERIR MENU',
        },
      ]}
    >
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
              <Button danger onClick={handleClickCancel}>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                loading={loading}
                disabled={disabledButton}
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
