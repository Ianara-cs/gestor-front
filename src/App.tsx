import { RouterProvider } from 'react-router'
import { router } from './routes'
import { useNotification } from './shared/hooks/useNotification'
import { useRequests } from './shared/hooks/useRequest'
import { useEffect } from 'react'
import { URL_AUTH } from './shared/constants/urls'
import { MethodsEnum } from './shared/enums/methods.enum'
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer'

function App() {
  const { contextHolder } = useNotification()
  const { setUser } = useGlobalReducer()
  const { request } = useRequests()

  useEffect(() => {
    request(URL_AUTH, MethodsEnum.GET, setUser)
  }, [])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
