import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScreenSizeType } from '../../../shared/types/ScreenSizeType'

export interface ScreenSizeState {
  screenSize?: ScreenSizeType
}

const initialState: ScreenSizeState = {
  screenSize: undefined,
}

export const counterSlice = createSlice({
  name: 'screenSizeReducer',
  initialState,
  reducers: {
    setScreenSizeActions: (state, action: PayloadAction<ScreenSizeType>) => {
      state.screenSize = action.payload
    },
  },
})

export const { setScreenSizeActions } = counterSlice.actions

export default counterSlice.reducer
