import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MenuRoutesEnum } from '../../menus/routes'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { WHO_AM_I } from '../../../shared/graphql/queries/authQueries'
import { getAuthorizationToken } from '../../../shared/functions/connection/auth'
import { AUTHORIZATION_KEY } from '../../../shared/constants/authorizationConstants'
import Loading from '../../../shared/components/loading/Loading'
import { ContainerFirstScreen } from '../styles/firstScreen.styles'

const FirstScreen = () => {
  const navigate = useNavigate()
  const { user, setUser } = useGlobalReducer()

  const {executeQuery} = useGraphQLQuery({
    query: WHO_AM_I,
    saveGlobal: setUser
  })

  useEffect(() => {
    const token = getAuthorizationToken(AUTHORIZATION_KEY);
    if(token && !user) {
      executeQuery()
    }
    navigate(MenuRoutesEnum.MENUS)
  }, [executeQuery, user])

  return (
    <ContainerFirstScreen>
      <Loading size='large' />
    </ContainerFirstScreen>
  )
}

export default FirstScreen
