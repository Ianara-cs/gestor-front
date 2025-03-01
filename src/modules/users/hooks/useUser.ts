import { useEffect, useState } from 'react'
import { UserType } from '../types/UserType'
import { useRequests } from '../../../shared/hooks/useRequest'
import { URL_USER } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods.enum'

export const useUser = () => {
  const [usersFiltered, setUsersFiltered] = useState<UserType[]>([])
  const [users, setUsers] = useState<UserType[]>([])
  const { request } = useRequests()

  useEffect(() => {
    setUsersFiltered([...users])
  }, [users])

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, setUsers)
  }, [])

  return {
    usersFiltered,
  }
}
