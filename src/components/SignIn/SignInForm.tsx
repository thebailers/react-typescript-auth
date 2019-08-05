/** @jsx jsx */
import { jsx } from '@emotion/core'

import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

import { Input, Button } from '../lib'
import { FormErrorPanel } from '../utils'
import messages from '../../constants/messages'

const initialState = {
  email: '',
  password: '',
}

interface P {
  firebase: firebase.app.App
  history: any
}

interface Error {
  message?: string
}

export const SignInFormData = ({ firebase, ...props }: P) => {
  const stateReducer = (
    state: { email: string; password: string },
    update: { [x: string]: string },
  ) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(stateReducer, initialState)
  const [error, setError] = React.useState<Error>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { email, password } = state

    if (!email || !password) {
      setError({
        message: messages.formAllFieldsRequired,
      })
      return
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(initialState)
        props.history.push(ROUTES.HOME)
      })
      .catch(error => setError(error))
  }

  const handleChange = ({
    currentTarget: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ [name]: value })
  }

  return (
    <form onSubmit={handleSubmit} data-testid="form" noValidate>
      {error && error.message && <FormErrorPanel message={error.message} />}
      <Input
        name="email"
        id="email"
        type="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
        data-testid="signin-emailinput"
      />
      <Input
        name="password"
        id="password"
        type="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Password"
        data-testid="signin-passwordinput"
      />
      <Button type="submit">Sign In</Button>
    </form>
  )
}

const SignInForm = compose<P, {}>(
  withRouter,
  withFirebase,
)(SignInFormData)

export default SignInForm
