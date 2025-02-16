import Input from '../../../shared/components/inputs/input/input'
import Screen from '../../../shared/components/screen/Screen'
import { MenuRoutesEnum } from '../routes'
import Button from '../../../shared/components/buttons/button/button'
import Select from '../../../shared/components/inputs/select/select'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import { MenuInsertContainer } from '../styles/menuInsert'
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled'
import { useInsertMenu } from '../hooks/useInsertMenu'

const MenuInsert = () => {
  const {
    loading,
    disabledButton,
    menu,
    handleChange,
    handleClickCancel,
    handleInsertMenu,
    onChange,
  } = useInsertMenu()

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'HOME',
        },
        {
          title: 'MENUS',
          href: MenuRoutesEnum.MENU,
        },
        {
          title: 'INSERIR MENU',
        },
      ]}
    >
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
            title="Categoria"
            margin={'0px 0px 32px 0px'}
            // defaultValue="BAR"
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
                Inserir Menu
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </MenuInsertContainer>
    </Screen>
  )
}

export default MenuInsert
