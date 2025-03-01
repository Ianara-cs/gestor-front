import { MenuType } from '../types/MenuType'
import { ColumnsType } from 'antd/es/table'
import Table from '../../../shared/components/table/Table'
import Screen from '../../../shared/components/screen/Screen'
import Button from '../../../shared/components/buttons/button/button'
import { Input, Modal } from 'antd'
import {
  FlexJustifyBetween,
  FlexJustifyCenter,
} from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import { useMenu } from '../hooks/useMenu'
import { useMemo, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { Search } = Input

const MenuScreen = () => {
  const {
    menusFiltered,
    openModalDelete,
    handleOnClick,
    onSearch,
    handleDeleteMenu,
    handleEditMenu,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useMenu()

  const columns: ColumnsType<MenuType> = useMemo(
    () => [
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
        key: 'category',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, menu) => (
          <FlexJustifyCenter>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditMenu(menu.id)}
              icon={<EditOutlined />}
            >
              Editar
            </Button>
            <Button danger onClick={() => handleOpenModalDelete(menu.id)} icon={<DeleteOutlined />}>
              Deletar
            </Button>
          </FlexJustifyCenter>
        ),
      },
    ],
    [],
  )

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
      <Modal
        title="Atenção!"
        open={openModalDelete}
        onOk={handleDeleteMenu}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir o menu?</p>
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
      <Table columns={columns} dataSource={menusFiltered} />
    </Screen>
  )
}
export default MenuScreen
