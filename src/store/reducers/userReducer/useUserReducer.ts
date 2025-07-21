import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { setUserActions, setUsersActions } from '.'
import { UserType } from '../../../modules/users/types/UserType'

export const useUserReducer = () => {
  const dispatch = useDispatch()
  const { users, user } = useAppSelector((state) => state.userReducer)

  const setUsers = (currentUsers: UserType[]) => {
    dispatch(setUsersActions(currentUsers))
  }

  const setUser = (currentUser?: UserType) => {
    dispatch(setUserActions(currentUser))
  }

  return {
    users,
    user,
    setUsers,
    setUser,
  }
}
