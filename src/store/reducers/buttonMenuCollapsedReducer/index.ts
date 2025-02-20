import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ButtonMenuCollapsedType } from '../../../shared/types/ButtonMenuCollapsedType'

export interface ButtonMenuCollapsedState {
  buttonMenuActivate: boolean
}

const initialState: ButtonMenuCollapsedState = {
  buttonMenuActivate: false,
}

export const ButtonMenuCollapsedSlice = createSlice({
  name: 'buttonMenuCollapsedReducer',
  initialState,
  reducers: {
    setButtonMenuCollapsedActions: (state, action: PayloadAction<boolean>) => {
      state.buttonMenuActivate = action.payload
    },
  },
})

export const { setButtonMenuCollapsedActions } = ButtonMenuCollapsedSlice.actions

export default ButtonMenuCollapsedSlice.reducer
