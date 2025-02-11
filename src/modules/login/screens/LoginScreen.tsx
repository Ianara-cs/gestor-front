import Input from '../../../shared/inputs/input'
import { ContainerLoginScreen, LoginBox, Title } from '../styles/loginScreen.styles'

const LoginScreen = () => {
  return (
    <ContainerLoginScreen>
      <LoginBox>
        <Title>Login</Title>
        <Input title='Email:' placeholder='Digite o seu email' />
        <Input title='Senha:' placeholder='Digite a sua senha'/>
      </LoginBox>
    </ContainerLoginScreen>
  )
}

export default LoginScreen
