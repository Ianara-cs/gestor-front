import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { setUsersActions } from '.'
import { UserType } from '../../../modules/users/types/UserType'

export const useUserReducer = () => {
  const dispatch = useDispatch()
  const { users } = useAppSelector((state) => state.userReducer)

  const setUsers = (currentUsers: UserType[]) => {
    dispatch(setUsersActions(currentUsers))
  }

  return {
    users,
    setUsers,
  }
}
