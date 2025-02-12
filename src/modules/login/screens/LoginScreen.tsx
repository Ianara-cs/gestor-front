import { useState } from 'react'
import Button from '../../../shared/components/buttons/button/button'
import Input from '../../../shared/components/inputs/input'
import { ContainerLoginScreen, LoginBox, Title } from '../styles/loginScreen.styles'
import axios from 'axios'
import { useRequests } from '../../../shared/components/hooks/useRequest'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {postRequest, loading} = useRequests()

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    postRequest('', {
      email: email,
      password: password
    })
  }

  return (
    <ContainerLoginScreen>
      <LoginBox>
        <Title>Login</Title>
        <Input 
          title='Email:' 
          placeholder='Digite o seu email' 
          onChange={handleEmail} 
          value={email} 
        />
        <Input 
          type='password'
          title='Senha:' 
          placeholder='Digite a sua senha' 
          onChange={handlePassword} 
          value={password}
        />
        <Button loading={loading} margin='2rem 0' type='primary' onClick={handleLogin}>Entrar</Button>
      </LoginBox>
    </ContainerLoginScreen>
  )
}

export default LoginScreen
