import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemType } from '../../../modules/items/types/ItemType'

export interface ItemState {
  items: ItemType[]
}

const initialState: ItemState = {
  items: [],
}

export const itemSlice = createSlice({
  name: 'itemReduce',
  initialState,
  reducers: {
    setItemActions: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload
    },
  },
})

export const { setItemActions } = itemSlice.actions

export default itemSlice.reducer
