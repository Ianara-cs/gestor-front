import Search from 'antd/es/input/Search'
import Button from '../../../shared/components/buttons/button/button'
import Screen from '../../../shared/components/screen/Screen'
import { FlexJustifyBetween } from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import Table from '../../../shared/components/table/Table'
import { ColumnsType } from 'antd/es/table'
import { UserType } from '../types/UserType'
import { useMemo } from 'react'
import { useUser } from '../hooks/useUser'
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons'
import { Avatar, List, Modal } from 'antd'
import { getObjetValue } from '../../../shared/functions/utils'
import { useScreenSizeReducer } from '../../../store/reducers/screenSizeReducer/useScreenSizeReducer'
import FloatingButton from '../../../shared/components/buttons/floatingButton/floatingButton'

const roles = {
  MANAGER: 'Gerente',
  CHEF: 'Cozinheiro',
  ATTENDENT: 'Garçom',
}

const UsersScreen = () => {
  const {
    usersFiltered,
    openModalDelete,
    handleDeleteUser,
    handleOpenModalDelete,
    handleCloseModalDelete,
  } = useUser()
  const { screenSize } = useScreenSizeReducer()

  const columns: ColumnsType<UserType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (_, user) => <p>{user.name}</p>,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text) => <p>{text}</p>,
        // sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Função',
        dataIndex: 'groups',
        key: 'groups',
        render: (_, user) => <p>{getObjetValue(roles, user.role)}</p>,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, user) => (
          <div className="flex gap-1">
            <Button danger onClick={() => handleOpenModalDelete(user.id)} icon={<DeleteOutlined />}>
              Deletar
            </Button>
            <Button icon={<EditOutlined />}>Editar</Button>
            <Button icon={user.isActive ? <UserDeleteOutlined /> : <UserAddOutlined />}>
              {user.isActive ? 'Desativar' : 'Ativar'}
            </Button>
          </div>
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
        <LimitedContainer width={screenSize?.isMobile ? 600 : 240}>
          <Search placeholder="Nome do item" enterButton />
        </LimitedContainer>
        {!screenSize?.isMobile && (
          <LimitedContainer width={120}>
            <Button type="primary">Inserir</Button>
          </LimitedContainer>
        )}
      </FlexJustifyBetween>
      {screenSize?.isDesktop ? (
        <Table columns={columns} dataSource={usersFiltered} />
      ) : (
        <List
          itemLayout={screenSize?.isMobile ? 'vertical' : 'horizontal'}
          size="large"
          pagination={{
            onChange: (page) => {},
            pageSize: 3,
            align: 'center',
          }}
          dataSource={usersFiltered}
          renderItem={(user, index) => (
            <List.Item
              key={user.id}
              actions={[
                <div className="flex flex-wrap md:flex-col gap-2 items-center w-full justify-center">
                  <Button
                    danger
                    onClick={() => handleOpenModalDelete(user.id)}
                    icon={<DeleteOutlined />}
                  >
                    Deletar
                  </Button>
                  <Button icon={<EditOutlined />}>Editar</Button>
                  <Button icon={user.isActive ? <UserDeleteOutlined /> : <UserAddOutlined />}>
                    {user.isActive ? 'Desativar' : 'Ativar'}
                  </Button>
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={
                  <div className="flex flex-col gap-1 md:gap-1">
                    <span className="text-xl font-bold">{user.name}</span>
                    <span className="text-xs md:text-base">Username: {user.username}</span>
                  </div>
                }
                description={
                  <span className="text-xs md:text-base font-bold">
                    Função: {getObjetValue(roles, user.role)}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      )}
      {screenSize?.isMobile && <FloatingButton type="primary" children={'Inserir'} width="60%" />}
    </Screen>
  )
}

export default UsersScreen
