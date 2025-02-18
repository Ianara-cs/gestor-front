import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MenuType } from '../../../modules/menus/types/MenuType'

export interface MenuState {
  menus: MenuType[]
}

const initialState: MenuState = {
  menus: [],
}

export const counterSlice = createSlice({
  name: 'menuReduce',
  initialState,
  reducers: {
    setMenusActions: (state, action: PayloadAction<MenuType[]>) => {
      state.menus = action.payload
    },
  },
})

export const { setMenusActions } = counterSlice.actions

export default counterSlice.reducer
