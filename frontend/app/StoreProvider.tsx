'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'

interface StoreProviderProps {
  children: React.ReactNode;
  user?: any;
}

export default function StoreProvider({ children, user }: StoreProviderProps) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore(user ? { auth: { user, token: null, loading: false, registerLoading: false, error: null, successMessage: null } } : undefined)
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}