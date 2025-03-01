import Input from '../../../shared/components/inputs/input/input'
import Screen from '../../../shared/components/screen/Screen'
import { MenuRoutesEnum } from '../routes'
import Button from '../../../shared/components/buttons/button/button'
import Select from '../../../shared/components/inputs/select/select'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import { MenuInsertContainer } from '../styles/menuInsert'
import {
  DisplayFlexJustifyRight,
  FlexJustifyCenter,
} from '../../../shared/components/styles/display.styled'
import { useInsertMenu } from '../hooks/useInsertMenu'
import { useParams } from 'react-router'
import Loading from '../../../shared/components/loading/Loading'

const MenuInsert = () => {
  const { menuId } = useParams<{ menuId: string }>()
  const {
    loading,
    loadingMenu,
    disabledButton,
    menu,
    isEdit,
    handleChange,
    handleClickCancel,
    handleInsertMenu,
    onChange,
  } = useInsertMenu(menuId)

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'HOME',
        },
        {
          title: 'MENUS',
          href: MenuRoutesEnum.MENUS,
        },
        {
          title: isEdit ? 'EDITAR MENU' : 'INSERIR MENU',
        },
      ]}
    >
      {loadingMenu ? (
        <FlexJustifyCenter>
          {' '}
          <Loading size="large" />{' '}
        </FlexJustifyCenter>
      ) : (
        <MenuInsertContainer>
          <LimitedContainer width={400}>
            <Input
              onChange={(event) => onChange(event, 'name')}
              margin={'0px 0px 16px 0px'}
              title="Nome"
              placeholder="Nome"
              value={menu.name}
            />
            <Select
              defaultValue={menu.category}
              title="Categoria"
              margin={'0px 0px 32px 0px'}
              placeholder="Escolha uma categoria"
              style={{ width: '100%' }}
              onChange={handleChange}
              options={[
                { value: 'BAR', label: 'Bar' },
                { value: 'KITCHEN', label: 'Cozinha' },
              ]}
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
                  onClick={handleInsertMenu}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Inserir menu'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        </MenuInsertContainer>
      )}
    </Screen>
  )
}

export default MenuInsert
