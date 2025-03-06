import Button from '../../../shared/components/buttons/button/button'
import Input from '../../../shared/components/inputs/input/input'
import { ContainerLoginScreen, LoginBox, Title } from '../styles/loginScreen.styles'
import { useLogin } from '../hooks/useLogin'

const LoginScreen = () => {
  const {
    loading, 
    signIn,
    handleLogin, 
    onChangeInput,
  } = useLogin()

  return (
    <ContainerLoginScreen>
      <LoginBox>
        <Title>Login</Title>
        <Input
          title="Usuário:"
          placeholder="Digite o seu usário"
          onChange={(e) => onChangeInput(e, 'username')}
          value={signIn.username}
        />
        <Input
          title="Senha:"
          type="password"
          placeholder="Digite a sua senha"
          onChange={(e) => onChangeInput(e, 'password')}
          value={signIn.password}
        />
        <Button loading={loading} margin="2rem 0" type="primary" onClick={handleLogin}>
          Entrar
        </Button>
      </LoginBox>
    </ContainerLoginScreen>
  )
}

export default LoginScreen
