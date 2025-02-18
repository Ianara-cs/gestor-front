import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { NotificationEnum } from '../../../shared/types/NotificationType'
import { setNotificationActions, setUserActions } from '.'
import { UserType } from '../../../modules/login/types/UserType'

export const useGlobalReducer = () => {
  const dispatch = useDispatch()
  const { notification, user } = useAppSelector((state) => state.globalReducer)

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

  return {
    notification,
    user,
    setNotification,
    setUser,
  }
}
