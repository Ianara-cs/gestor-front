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

const UsersScreen = () => {
  const { usersFiltered } = useUser()

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
        title: 'Senha',
        dataIndex: 'password',
        key: 'password',
        render: (text) => <p>{text}</p>,
      },
      {
        title: 'Funções',
        dataIndex: 'groups',
        key: 'groups',
        render: (_, user) => user.groups.map((group) => <p>{group}</p>),
        sorter: (a, b) => a.name.localeCompare(b.name),
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
      <FlexJustifyBetween>
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
