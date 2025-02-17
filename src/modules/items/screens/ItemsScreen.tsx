import { ColumnsType } from 'antd/es/table'
import Screen from '../../../shared/components/screen/Screen'
import Table from '../../../shared/components/table/Table'
import { ItemType } from '../types/ItemType'
import { useEffect, useState } from 'react'
import { useDataContext } from '../../../shared/hooks/useDataContext'
import { useRequests } from '../../../shared/hooks/useRequest'
import { URL_ITEM } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'
import {
  DisplayFlexJustifyRight,
  FlexJustifyBetween,
} from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import Button from '../../../shared/components/buttons/button/button'
import { Input } from 'antd'
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
  const { items, setItems } = useDataContext()
  const { request } = useRequests()
  const [itemsFiltered, setItemsFiltered] = useState<ItemType[]>([])

  useEffect(() => {
    setItemsFiltered([...items])
  }, [items])

  useEffect(() => {
    request(URL_ITEM, MethodsEnum.GET, setItems)
  }, [])

  const onSearch = (value: string) => {
    if (!value) {
      setItemsFiltered([...items])
    } else {
      setItemsFiltered([...itemsFiltered.filter((item) => item.name.includes(value))])
    }
  }

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
          <Button type="primary">Inserir</Button>
        </LimitedContainer>
      </FlexJustifyBetween>
      <Table columns={columns} dataSource={itemsFiltered} />
    </Screen>
  )
}

export default ItemsScreen
