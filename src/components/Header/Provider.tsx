import React from 'react'
import { Action } from './'

type Dispatch = (action: Action) => void

export const useNavDispatch = () => {
  const context = React.useContext(NavUpdateDispatchContext)
  if (context === undefined) {
    throw new Error(`useNavDispatch must be used within a Nav Provider`)
  }
  return context
}

export const NavUpdateDispatchContext = React.createContext<
  Dispatch | undefined
>(undefined)
