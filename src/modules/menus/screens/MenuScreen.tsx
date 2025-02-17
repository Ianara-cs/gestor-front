import { MenuType } from '../types/MenuType'
import { ColumnsType } from 'antd/es/table'
import Table from '../../../shared/components/table/Table'
import Screen from '../../../shared/components/screen/Screen'
import Button from '../../../shared/components/buttons/button/button'
import { Input } from 'antd'
import { FlexJustifyBetween } from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import { useMenu } from '../hooks/useMenu'
const { Search } = Input

const columns: ColumnsType<MenuType> = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
]

const MenuScreen = () => {
  const { handleOnClick, menusFiltered, onSearch } = useMenu()

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'HOME',
        },
        {
          title: 'MENUS',
        },
      ]}
    >
      <FlexJustifyBetween margin="16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Nome do item" onSearch={onSearch} enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button onClick={handleOnClick} type="primary">
            Inserir
          </Button>
        </LimitedContainer>
      </FlexJustifyBetween>
      <Table columns={columns} dataSource={menusFiltered} />
    </Screen>
  )
}
export default MenuScreen
