import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuReducer'
import globalReducer from './reducers/globalReducer'
import itemReducer from './reducers/itemReducer'

export const store = configureStore({
  reducer: {
    menuReducer,
    globalReducer,
    itemReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
