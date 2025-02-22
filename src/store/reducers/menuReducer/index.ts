import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MenuType } from '../../../modules/menus/types/MenuType'

export interface MenuState {
  menus: MenuType[]
  menu?: MenuType
}

const initialState: MenuState = {
  menus: [],
  menu: undefined,
}

export const counterSlice = createSlice({
  name: 'menuReduce',
  initialState,
  reducers: {
    setMenusActions: (state, action: PayloadAction<MenuType[]>) => {
      state.menus = action.payload
    },
    setMenuActions: (state, action: PayloadAction<MenuType | undefined>) => {
      state.menu = action.payload
    },
  },
})

export const { setMenusActions, setMenuActions } = counterSlice.actions

export default counterSlice.reducer
