import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { FirebaseContext } from '../../Firebase'
import firebase from '../../Firebase'

import PasswordForget from '../index'

jest.mock('../../Firebase/firebase', () => {
  return {
    auth: jest.fn(() => ({
      sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
    })),
  }
})

afterEach(cleanup)

const setup = () => {
  const utils = render(
    <FirebaseContext.Provider value={firebase}>
      <PasswordForget />
    </FirebaseContext.Provider>,
  )
  const form = utils.getByTestId('form')
  const emailInput = utils.getByTestId('pwf-email') as HTMLInputElement
  const h1 = utils.getByText(/Forgotten Password/i)
  return {
    h1,
    form,
    emailInput,
    ...utils,
  }
}

test('should render the forgotten password component with the appropriate H1 heading', () => {
  const { h1 } = setup()
  expect(h1).not.toBeNull()
})

test('should update email input field correctly', () => {
  const { emailInput } = setup()
  const email = 'peterparker@foo.com'
  expect(emailInput.value).toBe('')
  fireEvent.change(emailInput, { target: { value: email } })
  expect(emailInput.value).toBe(email)
})

test('should render a client side error message when an invalid email is entered', () => {
  const { form, emailInput, queryByTestId, debug } = setup()
  expect(queryByTestId('error-message')).toBeNull()
  const email = 'peterparker'
  fireEvent.change(emailInput, { target: { value: email } })
  fireEvent.submit(form)
  expect(queryByTestId('error-message')).toBeInTheDocument()
})

// test('should call sendPasswordResetEmail method when the form is submitted with a valid email', () => {
//   const { form, emailInput } = setup()
//   const email = 'peterparker@foo.com'
//   fireEvent.change(emailInput, { target: { value: email } })
//   expect(emailInput.value).not.toBeNull()
//   fireEvent.submit(form)
//   expect(firebase.auth().sendPasswordResetEmail).toHaveBeenCalledTimes(1)
// })
