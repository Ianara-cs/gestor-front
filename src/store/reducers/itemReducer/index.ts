import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemType } from '../../../modules/items/types/ItemType'

export interface ItemState {
  items: ItemType[]
  item?: ItemType
}

const initialState: ItemState = {
  items: [],
  item: undefined
}

export const itemSlice = createSlice({
  name: 'itemReduce',
  initialState,
  reducers: {
    setItemsActions: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload
    },
    setItemActions: (state, action: PayloadAction<ItemType | undefined>) => {
      state.item = action.payload
    },
  },
})

export const { setItemsActions, setItemActions } = itemSlice.actions

export default itemSlice.reducer
