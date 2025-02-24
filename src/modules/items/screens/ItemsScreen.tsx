import { ColumnsType } from 'antd/es/table'
import Screen from '../../../shared/components/screen/Screen'
import Table from '../../../shared/components/table/Table'
import { ItemType } from '../types/ItemType'
import { FlexJustifyBetween, FlexJustifyCenter } from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import Button from '../../../shared/components/buttons/button/button'
import { Input, Modal } from 'antd'
import { useItem } from '../hooks/useItem'
import { convertNumberToMoney } from '../../../shared/functions/money'
import { useMemo } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { Search } = Input

const ItemsScreen = () => {
  const { 
    itemsFiltered, 
    openModalDelete,
    onSearch, 
    handleOnClick,
    handleEditItem,
    handleDeleteItem,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useItem()

  const columns: ColumnsType<ItemType> = useMemo(() => [
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
      render: (_, item) => <a>{convertNumberToMoney(parseFloat(`${item.price}`))}</a>,
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
    {
      title: 'Ações',
      dataIndex: '',
      width: 240,
      key: 'x',
      render: (_, menu) => 
      <FlexJustifyCenter>
        <Button margin="0px 16px 0px 0px" onClick={() => handleEditItem(menu.id)} icon={<EditOutlined />}>Editar</Button>
        <Button danger onClick={() => handleOpenModalDelete(menu.id)} icon={<DeleteOutlined />}>Deletar</Button>
      </FlexJustifyCenter>
    },
  ], [])

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
      <Modal
          title="Atenção!"
          open={openModalDelete}
          onOk={handleDeleteItem}
          onCancel={handleCloseModalDelete}
          okText="Sim"
          cancelText="Cancelar"
        >
          <p>Tem certeza que deseja excluir o item?</p>
        </Modal>
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
