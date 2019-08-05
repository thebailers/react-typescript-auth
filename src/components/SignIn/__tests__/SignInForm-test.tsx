import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// import { firebaseApp as mockFirebase } from '../../Firebase/firebase'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SignInForm from '../SignInForm'

// jest.mock('../../Firebase/firebase', () => {
//   const fire = {
//     firebase: {
//       auth: () => ({ signOut: () => Promise.resolve() }),
//     },
//   }
//   return fire
// })

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
  const utils = renderWithRouter(<SignInForm />)
  const form = utils.getByTestId('form')
  const signInButton = utils.getByText(/Sign In/i)
  const emailInput = utils.getByTestId('signin-emailinput') as HTMLInputElement
  const passwordInput = utils.getByTestId(
    'signin-passwordinput',
  ) as HTMLInputElement
  return {
    form,
    signInButton,
    emailInput,
    passwordInput,
    ...utils,
  }
}

afterEach(cleanup)

test('renders a Sign In button', () => {
  const { signInButton } = setup()
  expect(signInButton.textContent).toBe('Sign In')
})

test(`typing in the email input updates it's value`, () => {
  const { emailInput } = setup()
  expect(emailInput.value).toBe('')
  fireEvent.change(emailInput, { target: { value: 'peterparker@foo.com' } })
  expect(emailInput.value).toBe('peterparker@foo.com')
})

test(`typing in the password input updates it's value`, () => {
  const { passwordInput } = setup()
  expect(passwordInput.value).toBe('')
  fireEvent.change(passwordInput, { target: { value: 'mufasa' } })
  expect(passwordInput.value).toBe('mufasa')
})

test('submitting the form with an empty email input produces an error', () => {
  const { form, getByTestId } = setup()
  fireEvent.submit(form, {
    target: {
      email: { value: '' },
      password: { value: '' },
    },
  })
  expect(getByTestId('error-message')).toHaveTextContent(
    'All fields are required.',
  )
})

test('submitting the form with valid data in both fields produces no error', () => {
  const { form, emailInput, passwordInput, queryByTestId } = setup()
  fireEvent.change(emailInput, {
    target: { value: 'peterparker@foo.com' },
  })
  fireEvent.change(passwordInput, {
    target: { value: 'mj' },
  })
  fireEvent.submit(form)
  expect(queryByTestId('error-message')).toBeNull()
})

test('calls sign out on click', async () => {
  const { form, emailInput, passwordInput, queryByTestId } = setup()
  fireEvent.change(emailInput, {
    target: { value: 'peterparker@foo.com' },
  })
  fireEvent.change(passwordInput, {
    target: { value: 'mj' },
  })
  fireEvent.submit(form)
  expect(queryByTestId('error-message')).toBeNull()
})
