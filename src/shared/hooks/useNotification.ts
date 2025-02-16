import { notification as notificationAnt } from 'antd'
import { useGlobalContext } from './useGlobalContext'
import { useEffect } from 'react'

export const useNotification = () => {
  const [api, contextHolder] = notificationAnt.useNotification()
  const { notification } = useGlobalContext()

  useEffect(() => {
    if (notification?.message && notification.type) {
      api[notification.type]({
        message: notification.message,
        description: notification.description,
        placement: 'bottomRight',
      })
    }
  }, [notification])

  return {
    api,
    contextHolder,
  }
}
