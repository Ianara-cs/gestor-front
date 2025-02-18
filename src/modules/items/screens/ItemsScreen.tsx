import { ColumnsType } from 'antd/es/table'
import Screen from '../../../shared/components/screen/Screen'
import Table from '../../../shared/components/table/Table'
import { ItemType } from '../types/ItemType'
import { FlexJustifyBetween } from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import Button from '../../../shared/components/buttons/button/button'
import { Input } from 'antd'
import { useItem } from '../hooks/useItem'
const { Search } = Input

const columns: ColumnsType<ItemType> = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quant. de Pessoas',
    dataIndex: 'quantityPeople',
    key: 'quantityPeople',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Menu',
    dataIndex: 'menuId',
    key: 'menuId',
    render: (text) => <a>{text}</a>,
  },
]

const ItemsScreen = () => {
  const { itemsFiltered, onSearch, handleOnClick } = useItem()

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'HOME',
        },
        {
          title: 'ITENS',
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
      <Table columns={columns} dataSource={itemsFiltered} />
    </Screen>
  )
}

export default ItemsScreen
