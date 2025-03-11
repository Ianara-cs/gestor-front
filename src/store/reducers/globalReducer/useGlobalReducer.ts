import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { NotificationEnum } from '../../../shared/types/NotificationType'
import { setNotificationActions, setPaginateActions, setUserActions } from '.'
import { UserType } from '../../../modules/login/types/UserType'
import { PaginationType } from '../../../shared/types/PaginationType'

export const useGlobalReducer = () => {
  const dispatch = useDispatch()
  const { notification, user, paginate } = useAppSelector((state) => state.globalReducer)

  const setNotification = (message: string, type: NotificationEnum, description?: string) => {
    dispatch(
      setNotificationActions({
        message,
        type,
        description,
      }),
    )
  }

  const setUser = (current: UserType) => {
    dispatch(setUserActions(current))
  }

  const setPaginate = (current: PaginationType) => {
    dispatch(setPaginateActions(current))
  }

  return {
    notification,
    user,
    paginate,
    setNotification,
    setUser,
    setPaginate,
  }
}
