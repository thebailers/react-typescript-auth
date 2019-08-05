import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, within } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import SignUp from '../index'

afterEach(cleanup)

function renderWithRouter(
  ui: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

const setup = () => {
  const utils = renderWithRouter(<SignUp />)
  const form = utils.getByTestId('form')
  const username = utils.getByLabelText(/username/i) as HTMLInputElement
  const email = utils.getByLabelText(/email/i) as HTMLInputElement
  const password = utils.getByTestId('password') as HTMLInputElement
  const repeatPassword = utils.getByTestId(
    'repeat-password',
  ) as HTMLInputElement
  const checkbox = utils.getByLabelText(/administrator/i) as HTMLInputElement
  const button = utils.getByText(/sign up/i)

  return {
    form,
    username,
    email,
    password,
    repeatPassword,
    checkbox,
    button,
    ...utils,
  }
}

test('should show submit button as disabled when all fields are empty', () => {
  const { button } = setup()
  expect(button).toBeDisabled()
})

test('should show submit button enabled when each field has a value', () => {
  const { username, email, password, repeatPassword, button, debug } = setup()

  fireEvent.change(username, { target: { value: 'Peter Parker' } })
  expect(username.value).toBe('Peter Parker')

  fireEvent.change(email, { target: { value: 'peterparker@foo.com' } })
  expect(email.value).toBe('peterparker@foo.com')

  fireEvent.change(password, { target: { value: 'ilovemj' } })
  expect(password.value).toBe('ilovemj')

  expect(button).toBeDisabled()

  fireEvent.change(repeatPassword, { target: { value: 'ilovemj' } })
  expect(repeatPassword.value).toBe('ilovemj')

  expect(button).not.toBeDisabled()
})

test('should enable toggling of Administrator checkbox', () => {
  const { checkbox } = setup()
  expect(checkbox.checked).toEqual(false)
  fireEvent.click(checkbox)
  expect(checkbox.checked).toEqual(true)
})

// test('should populate the roles object with the admin role when form submitted with administrator checkbox checked', () => {
//   const {
//     checkbox,
//     username,
//     email,
//     password,
//     repeatPassword,
//     button,
//   } = setup()
//   fireEvent.change(username, { target: { value: 'Peter Parker' } })
//   expect(username.value).toBe('Peter Parker')

//   fireEvent.change(email, { target: { value: 'peterparker@foo.com' } })
//   expect(email.value).toBe('peterparker@foo.com')

//   fireEvent.change(password, { target: { value: 'ilovemj' } })
//   expect(password.value).toBe('ilovemj')

//   fireEvent.change(repeatPassword, { target: { value: 'ilovemj' } })
//   expect(repeatPassword.value).toBe('ilovemj')

//   fireEvent.click(checkbox)

//   fireEvent.click(button)

//   // need to test that auth().createUserWithEmailAndPassword().then() was run and sets the user with the right roles
//   console.log(
//     new Error(
//       'need to test that auth().createUserWithEmailAndPassword().then() was run and sets the user with the right roles',
//     ),
//   )
// })

// test('should disable the submit button until the sign up api request fails or succeeds', () => {
//   const { button } = setup()
//   fireEvent.click(button)
//   expect(button).toBeDisabled()
// })
