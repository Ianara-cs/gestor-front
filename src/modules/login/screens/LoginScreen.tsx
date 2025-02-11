import Button from '../../../shared/components/buttons/button/button'
import Input from '../../../shared/components/inputs/input'
import { ContainerLoginScreen, LoginBox, Title } from '../styles/loginScreen.styles'

const LoginScreen = () => {
  return (
    <ContainerLoginScreen>
      <LoginBox>
        <Title>Login</Title>
        <Input title='Email:' placeholder='Digite o seu email' />
        <Input title='Senha:' placeholder='Digite a sua senha'/>
        <Button margin='2rem 0' type='primary'>Entrar</Button>
      </LoginBox>
    </ContainerLoginScreen>
  )
}

export default LoginScreen
