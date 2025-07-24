import { useEffect, useState } from 'react'
import { UserType } from '../types/UserType'
import { useGraphQLQuery } from '../../../shared/hooks/useGraphQLQuery'
import { GET_USERS } from '../../../shared/graphql/queries/usersQueries'
import { useGraphQLMutation } from '../../../shared/hooks/useGraphQLMutation'
import { DELETE_USER, DISABLE_USER } from '../../../shared/graphql/mutations/usersMutations'

export const useUser = () => {
  const [usersFiltered, setUsersFiltered] = useState<UserType[]>([])
  const [userDeleteId, setUserDeleteId] = useState<string | undefined>()
  const [users, setUsers] = useState<UserType[]>([])
  const { executeQuery, loading, refetch } = useGraphQLQuery({
    query: GET_USERS,
    saveGlobal: setUsers,
  })
  const { mutate: deleteUser } = useGraphQLMutation({
    mutation: DELETE_USER,
    successMessage: 'Usuário deletado!',
  })

  const { mutate: disableUser } = useGraphQLMutation({
    mutation: DISABLE_USER,
    successMessage: 'Usuário modificado!',
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
    await deleteUser({
      variables: {
        data: userDeleteId,
      },
    })
    setUserDeleteId(undefined)
    await refetch()
  }

  const handleCloseModalDelete = () => {
    setUserDeleteId(undefined)
  }

  const handleDisableUser = async (id: string, active: boolean) => {
    await disableUser({
      variables: {
        data: { id, active },
      },
    })
    await refetch()
  }

  return {
    usersFiltered,
    openModalDelete: !!userDeleteId,
    handleOpenModalDelete,
    handleDeleteUser,
    handleCloseModalDelete,
    handleDisableUser,
  }
}
