import Search from 'antd/es/input/Search'
import Button from '../../../shared/components/buttons/button/button'
import Screen from '../../../shared/components/screen/Screen'
import {
  FlexJustifyBetween,
  FlexJustifyCenter,
} from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import Table from '../../../shared/components/table/Table'
import { ColumnsType } from 'antd/es/table'
import { UserType } from '../types/UserType'
import { useMemo } from 'react'
import { useUser } from '../hooks/useUser'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

const UsersScreen = () => {
  const {
    usersFiltered,
    openModalDelete,
    handleDeleteUser,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useUser()

  const columns: ColumnsType<UserType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (_, user) => (
          <p>
            {user.name} {user.lastName}
          </p>
        ),
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Funções',
        dataIndex: 'groups',
        key: 'groups',
        render: (_, user) => user.groups.map((group) => <p>{group}</p>),
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, menu) => (
          <FlexJustifyCenter>
            <Button margin="0px 16px 0px 0px" icon={<EditOutlined />}>
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
          title: 'Usuários',
        },
      ]}
    >
      <Modal
        title="Atenção!"
        open={openModalDelete}
        onOk={handleDeleteUser}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir o usuário?</p>
      </Modal>
      <FlexJustifyBetween margin="16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Nome do item" enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button type="primary">Inserir</Button>
        </LimitedContainer>
      </FlexJustifyBetween>
      <Table columns={columns} dataSource={usersFiltered} />
    </Screen>
  )
}

export default UsersScreen
