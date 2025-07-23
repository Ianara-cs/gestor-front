import { RouterProvider } from 'react-router'
import { router } from './routes'
import { useNotification } from './shared/hooks/useNotification'
import { useEffect } from 'react'
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer'
import { useGraphQLQuery } from './shared/hooks/useGraphQLQuery'
import { WHO_AM_I } from './shared/graphql/queries/authQueries'
import { getAuthorizationToken } from './shared/functions/connection/auth'
import { AUTHORIZATION_KEY } from './shared/constants/authorizationConstants'
import * as dotenv from 'dotenv'

dotenv.config()

function App() {
  const { contextHolder } = useNotification()
  const { user, setUser } = useGlobalReducer()

  const { executeQuery } = useGraphQLQuery({
    query: WHO_AM_I,
    saveGlobal: setUser,
  })

  useEffect(() => {
    const token = getAuthorizationToken(AUTHORIZATION_KEY)
    if (token && !user) {
      executeQuery()
    }
  }, [executeQuery, user])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
