import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuReducer'
import globalReducer from './reducers/globalReducer'
import itemReducer from './reducers/itemReducer'
import screenSizeReducer from './reducers/screenSizeReducer'
import buttonMenuCollapsedReducer from './reducers/buttonMenuCollapsedReducer'

export const store = configureStore({
  reducer: {
    menuReducer,
    globalReducer,
    itemReducer,
    screenSizeReducer,
    buttonMenuCollapsedReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
