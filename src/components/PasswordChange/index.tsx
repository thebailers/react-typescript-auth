import React from 'react'
import { withFirebase } from '../Firebase'

import { FormErrorPanel } from '../utils'

import { Input, Button } from '../lib'

interface PCProps {
  firebase: firebase.app.App
}
interface S {
  password: string
  confirmPassword: string
}

interface Error {
  message?: string
}

const PasswordChange = ({ firebase }: PCProps) => {
  const initialState = {
    password: '',
    confirmPassword: '',
  }
  const stateReducer = (state: S, update: { [x: string]: string }) => ({
    ...state,
    ...update,
  })
  const [state, dispatch] = React.useReducer(stateReducer, initialState)
  const [error, setError] = React.useState<Error>()

  const { password, confirmPassword } = state
  const formIsInvalid =
    password === '' || confirmPassword === '' || password !== confirmPassword

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setError({
        message: 'Passwords must match',
      })
      return
    }

    firebase
      .auth()
      .currentUser!.updatePassword(password)
      .then(() => dispatch(initialState))
      .catch(error => setError(error))
  }

  const handleChange = ({
    currentTarget: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setError({})
    dispatch({ [name]: value })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Reset your password</legend>
        {error && error.message && <FormErrorPanel message={error.message} />}
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter new password"
        />
        <Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
        />
        <Button disabled={formIsInvalid} type="submit">
          Change password
        </Button>
      </fieldset>
    </form>
  )
}

export default withFirebase(PasswordChange)
