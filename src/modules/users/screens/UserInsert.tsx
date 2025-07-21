import Button from '../../../shared/components/buttons/button/button'
import Input from '../../../shared/components/inputs/input/input'
import Select from '../../../shared/components/inputs/select/select'
import Loading from '../../../shared/components/loading/Loading'
import Screen from '../../../shared/components/screen/Screen'
import {
  FlexJustifyRight,
  FlexJustifyCenter,
} from '../../../shared/components/styles/display.styled'
import { LimitedContainer } from '../../../shared/components/styles/limited.styled'
import { useInsertUser } from '../hooks/useInsertUser'
import { UsersRoutesEnum } from '../router'

const UserInsert = () => {
  const {
    user,
    loading,
    disabledButton,
    loadingItem,
    isEdit,
    handleChangeSelect,
    handleInsertUser,
    handleClickCancel,
    onChangeInput,
  } = useInsertUser()

  return (
    <Screen
      listBreadcrumb={[
        {
          title: 'Usuários',
          href: UsersRoutesEnum.USERS,
        },
        {
          title: isEdit ? 'Editar Usuário' : 'CRIAR USUÁRIO',
        },
      ]}
    >
      {loadingItem ? (
        <FlexJustifyCenter>
          <Loading size="large" />
        </FlexJustifyCenter>
      ) : (
        <FlexJustifyCenter>
          <LimitedContainer width={400}>
            <Input
              onChange={(event) => onChangeInput(event, 'name')}
              margin={'0px 0px 16px 0px'}
              title="Nome"
              placeholder="Digite o nome"
              value={user.name}
            />
            <Input
              onChange={(event) => onChangeInput(event, 'username')}
              margin={'0px 0px 16px 0px'}
              title="Username:"
              placeholder="Digite o username"
              value={user.username}
            />
            <Input
              onChange={(event) => onChangeInput(event, 'password')}
              margin={'0px 0px 16px 0px'}
              title="Senha:"
              placeholder="Digite a senha"
              value={user.password}
            />
            <Select
              defaultValue={user.role}
              title="Função:"
              margin={'0px 0px 32px 0px'}
              placeholder="Escolha uma Função"
              style={{ width: '100%' }}
              onChange={handleChangeSelect}
              options={[
                { value: 'ATTENDANT', label: 'Garçom' },
                { value: 'CHEF', label: 'Cozinheiro' },
                { value: 'MANAGER', label: 'Gerente' },
              ]}
            />
            <FlexJustifyRight>
              <LimitedContainer margin="0px 8px" width={120}>
                <Button danger onClick={handleClickCancel}>
                  Cancelar
                </Button>
              </LimitedContainer>
              <LimitedContainer width={120}>
                <Button
                  loading={loading}
                  disabled={disabledButton}
                  onClick={handleInsertUser}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Inserir Menu'}
                </Button>
              </LimitedContainer>
            </FlexJustifyRight>
          </LimitedContainer>
        </FlexJustifyCenter>
      )}
    </Screen>
  )
}

export default UserInsert
