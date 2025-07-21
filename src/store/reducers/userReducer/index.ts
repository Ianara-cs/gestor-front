import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../../modules/users/types/UserType'

export interface UserState {
  users: UserType[]
  user?: UserType
}

const initialState: UserState = {
  users: [],
  user: undefined,
}

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUsersActions: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload
    },
    setUserActions: (state, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload
    },
  },
})

export const { setUsersActions, setUserActions } = userSlice.actions

export default userSlice.reducer
