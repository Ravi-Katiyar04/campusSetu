import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // used to dispatch(add data) actions with correct types
export const useAppSelector = useSelector.withTypes<RootState>() // used to select(get) data from the store with correct types
export const useAppStore = useStore.withTypes<AppStore>()