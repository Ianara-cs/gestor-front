import Button from '../../../shared/components/buttons/button/button'
import Input from '../../../shared/components/inputs/input/input'
import { ContainerLoginScreen, LoginBox, Title } from '../styles/loginScreen.styles'
import { useLogin } from '../hooks/useLogin'

const LoginScreen = () => {
  const { loading, signIn, handleLogin, onChangeInput } = useLogin()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001529] !px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg !p-6">
        <h2 className="text-2xl font-bold text-center !mb-6">Login</h2>

        <div className="!mb-4">
          <label className="block text-sm font-medium text-gray-700 !mb-1">Usuário:</label>
          <input
            type="text"
            placeholder="Digite o usuário"
            className="w-full !px-4 !py-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            value={signIn.username}
            onChange={(e) => onChangeInput(e, 'username')}
          />
        </div>

        <div className="!mb-6">
          <label className="block text-sm font-medium text-gray-700 !mb-1">Senha:</label>
          <input
            type="password"
            placeholder="Digite a senha"
            className="w-full !px-4 !py-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            value={signIn.password}
            onChange={(e) => onChangeInput(e, 'password')}
          />
        </div>

        <Button type="primary" size="large" loading={loading} onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  )
}

export default LoginScreen
