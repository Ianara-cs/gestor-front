import { ColumnsType } from "antd/es/table"
import Screen from "../../../shared/components/screen/Screen"
import Table from "../../../shared/components/table/Table"
import { ItemType } from "../types/ItemType"
import { useEffect, useState } from "react"
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { useRequests } from "../../../shared/hooks/useRequest"
import { URL_ITEM } from "../../../shared/constants/urls"
import { MethodsEnum } from "../../../shared/enums/methods.enum"

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
]

const ItemsScreen = () => {
  const { items, setItems } = useDataContext()
  const {request} = useRequests()

  useEffect(() => {
    request(URL_ITEM, MethodsEnum.GET, setItems)
  }, [])

  return(
    <Screen>
      <Table columns={columns} dataSource={items} />
    </Screen>
  )
}

export default ItemsScreen