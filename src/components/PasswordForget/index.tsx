import React from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import validator from 'validator'

import * as ROUTES from '../../constants/routes'

import { Input, Button, H1 } from '../lib'
import { FormErrorPanel } from '../utils'
import messages from '../../constants/messages'

interface PFProps {
  firebase: firebase.app.App
}

interface S {
  email: string
}

interface Error {
  message?: string
}

const PasswordForget = ({ firebase }: PFProps) => {
  const initialState = { email: '' }
  const stateReducer = (state: S, update: { [x: string]: string }) => ({
    ...state,
    ...update,
  })
  const [state, dispatch] = React.useReducer(stateReducer, initialState)
  const [error, setError] = React.useState<Error>()

  const isValid = () => validator.isEmail(state.email)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!isValid()) {
      return setError({ message: messages.emailIsInvalid })
    }

    firebase
      .auth()
      .sendPasswordResetEmail(state.email)
      .then(success => console.log(success))
      .catch(error => setError(error))
    dispatch(initialState)
  }

  const handleChange = ({
    currentTarget: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined)
    dispatch({ [name]: value })
  }

  return (
    <>
      <H1>Forgotten password</H1>
      <p>
        Simply enter your email and we will send a password reset email to that
        address..
      </p>
      <form onSubmit={handleSubmit} data-testid="form" noValidate>
        {error && error.message && <FormErrorPanel message={error.message} />}
        <Input
          type="email"
          name="email"
          data-testid="pwf-email"
          value={state.email}
          onChange={handleChange}
          placeholder="Enter your email address"
        />
        <Button>Reset password</Button>
      </form>
    </>
  )
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgotten password</Link>
  </p>
)

export { PasswordForgetLink }
export default withFirebase(PasswordForget)
