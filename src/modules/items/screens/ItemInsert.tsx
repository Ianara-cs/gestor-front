import Button from '../../../shared/components/buttons/button/button'
import Input from '../../../shared/components/inputs/input/input'
import InputMoney from '../../../shared/components/inputs/inputMoney/inputMoney'
import Select from '../../../shared/components/inputs/select/select'
import TextArea from '../../../shared/components/inputs/textArea/textArea'
import Loading from '../../../shared/components/loading/Loading'
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
    loadingItem,
    isEdit,
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
          title: isEdit ? 'EDITAR ITEM' : 'INSERIR ITEM',
        },
      ]}
    >
      {loadingItem ? (
        <FlexJustifyCenter>
          <Loading size="large" />
        </FlexJustifyCenter>
      ) : (
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
              defaultValue={item.menuId}
              margin={'0px 0px 16px 0px'}
              placeholder="Escolha uma categoria"
              style={{ width: '100%' }}
              onChange={handleChangeSelect}
              options={menusFiltered.map((menu) => ({
                value: `${menu.id}`,
                label: `${menu.name}`,
              }))}
            />
            <TextArea
              title="Descrição"
              value={item.description}
              onChange={(event) => onChangeInput(event, 'description')}
              placeholder="Digite a descrição do item..."
              margin={'0px 0px 32px 0px'}
              autoSize={{ minRows: 3, maxRows: 5 }}
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
                  {isEdit ? 'Salvar' : 'Inserir Menu'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        </FlexJustifyCenter>
      )}
    </Screen>
  )
}

export default ItemInsert
