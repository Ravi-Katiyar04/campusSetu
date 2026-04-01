import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'

const rootReducer = {
  auth: authReducer,
}

export const makeStore = (preloadedState?: Partial<ReturnType<typeof configureStore<typeof rootReducer>>['getState']>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']