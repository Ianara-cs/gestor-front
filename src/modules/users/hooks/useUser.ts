import { useEffect, useState } from 'react'
import { UserType } from '../types/UserType'
import { useRequests } from '../../../shared/hooks/useRequest'
import { URL_USER, URL_USER_ID } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_USERS } from '../../../shared/graphql/queries/usersQueries'

export const useUser = () => {
  const [usersFiltered, setUsersFiltered] = useState<UserType[]>([])
  const [userDeleteId, setUserDeleteId] = useState<string | undefined>()
  const [users, setUsers] = useState<UserType[]>([])
  const { request } = useRequests()
  const { executeQuery, loading, refetch } = useGraphQLQuery({
    query: GET_USERS,
    saveGlobal: setUsers,
  })

  useEffect(() => {
    executeQuery()
  }, [])

  useEffect(() => {
    setUsersFiltered([...users])
  }, [users])

  const handleOpenModalDelete = (userId: string) => {
    setUserDeleteId(userId)
  }

  const handleDeleteUser = async () => {
    await request(
      URL_USER_ID.replace('{userId}', `${userDeleteId}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Usuário deletado!',
    )

    await request(URL_USER, MethodsEnum.GET, setUsers)
    setUserDeleteId(undefined)
  }

  const handleCloseModalDelete = () => {
    setUserDeleteId(undefined)
  }

  return {
    usersFiltered,
    openModalDelete: !!userDeleteId,
    handleOpenModalDelete,
    handleDeleteUser,
    handleCloseModalDelete,
  }
}
