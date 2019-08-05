import React from 'react'
import { firebaseApp as mockFirebase } from '../../Firebase/firebase'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SignOut from '../index'
import { NavUpdateDispatchContext, useNavDispatch } from '../../Header/Provider'

// jest.mock('../../Firebase/firebase', () => ({
//   auth: jest.fn(() => ({
//     signOut: jest.fn(() => Promise.resolve(true)),
//   })),
// }))

afterEach(cleanup)

test('renders a Sign Out button', () => {
  const { getByText } = render(
    <NavUpdateDispatchContext.Provider value={useNavDispatch}>
      <SignOut />
    </NavUpdateDispatchContext.Provider>,
  )
  expect(getByText(/SignOut/i).textContent).toBe('SignOut')
})

// test('renders a Sign Out button', () => {
//   const { getByText } = render(
//     <NavUpdateDispatchContext.Provider value={useNavDispatch}>
//       <SignOut />
//     </NavUpdateDispatchContext.Provider>,
//   )
//   const button = getByText(/SignOut/i)
//   fireEvent.click(button)
//   expect(mockFirebase.auth().signOut()).toHaveBeenCalledTimes(1)
// })
