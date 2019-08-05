/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import Logo from '../Logo'
import Navigation, { NavToggle } from '../Navigation'
import { NavUpdateDispatchContext } from '../Header/Provider'

export type Action = { type: 'close' } | { type: 'open' }
type State = { navIsOpen: boolean }

// setup context to allow opening/closing of the navigation on click of nav elements
// in deeply nested components
const initialState = {
  navIsOpen: false,
}

export const NavStatusContext = React.createContext<
  State | { navIsOpen: false }
>(initialState)

export const navReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'open': {
      return { navIsOpen: true }
    }
    case 'close': {
      return { navIsOpen: false }
    }
    default: {
      throw new Error(`Unhandled action type in navReducer: ${action!.type}`)
    }
  }
}

const Header = () => {
  const [state, dispatch] = React.useReducer(navReducer, { navIsOpen: false })

  return (
    <div
      css={{
        height: '45px',
        lineHeight: '45px',
      }}
    >
      <NavUpdateDispatchContext.Provider value={dispatch}>
        <NavStatusContext.Provider value={state}>
          <Logo />
          <Navigation />
          <NavToggle />
        </NavStatusContext.Provider>
      </NavUpdateDispatchContext.Provider>
    </div>
  )
}

export default Header
