import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { MenuType } from '../../../modules/menus/types/MenuType'
import { UserType } from '../../../modules/login/types/UserType'
import { NotificationType } from '../../../shared/types/NotificationType'

export interface GlobalState {
  notification?: NotificationType
  user?: UserType
}

const initialState: GlobalState = {
  notification: undefined,
  user: undefined,
}

export const globalSlice = createSlice({
  name: 'menuReduce',
  initialState,
  reducers: {
    setNotificationActions: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload
    },
    setUserActions: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
  },
})

export const { setNotificationActions, setUserActions } = globalSlice.actions

export default globalSlice.reducer
