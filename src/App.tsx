import { RouterProvider } from 'react-router'
import { router } from './routes'
import { useNotification } from './shared/hooks/useNotification'
import { useRequests } from './shared/hooks/useRequest'
import { useEffect } from 'react'
import { URL_USER } from './shared/constants/urls'
import { MethodsEnum } from './shared/enums/methods.enum'
import { useGlobalContext } from './shared/hooks/useGlobalContext'

function App() {
  const { contextHolder } = useNotification()
  const { setUser } = useGlobalContext()
  const { request } = useRequests()

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, setUser)
  }, [])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
