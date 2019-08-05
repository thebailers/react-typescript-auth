import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

import { TextInputLabel, Input, Button, H1 } from '../lib'

import Or from './or'
import GoogleSignIn from './GoogleSignIn'
import FacebookSignIn from './FacebookSignIn'

const SignUp = () => (
  <div>
    <H1>Register</H1>
    <SignUpForm />
    <Or />
    <GoogleSignIn />
    <FacebookSignIn />
  </div>
)

interface SignUpProps {
  firebase: firebase.app.App
  history: any
}

interface S {
  username: string
  email: string
  password: string
  repeatPassword: string
}

interface Error {
  message?: string
}

interface Roles {
  ADMIN?: string
}

const SignUpFormData = ({ firebase, history }: SignUpProps) => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  }

  const stateReducer = (
    state: S,
    action: { [x: string]: string | boolean },
  ) => ({
    ...state,
    ...action,
  })

  const [state, dispatch] = React.useReducer(stateReducer, initialState)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [error, setError] = React.useState<Error>({})

  const formIsInvalid =
    state.password !== state.repeatPassword ||
    state.password === '' ||
    state.username === '' ||
    state.email === ''

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { username, email, password } = state

    const roles: Roles = {}
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res: firebase.auth.UserCredential) => {
        if (res && res.user) {
          return firebase
            .database()
            .ref(`users/${res.user.uid}`)
            .set({
              username,
              email,
              roles,
            })
        } else {
          // TODO: Make this a user friendly displayed error in the UI - something went wrong
          throw new Error('res or res.user is not defined')
        }
      })
      .then(() => {
        const user = firebase.auth().currentUser
        if (user) {
          user.updateProfile({
            displayName: username,
          })
        }
      })
      .then(() => {
        dispatch(initialState)
        history.push(ROUTES.HOME)
      })
      .catch(error => setError(error))
  }

  const handleChange = ({
    currentTarget: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ [name]: value })
  }

  return (
    <form onSubmit={onSubmit} data-testid="form" noValidate>
      <TextInputLabel htmlFor="username">Username</TextInputLabel>
      <Input
        id="username"
        name="username"
        value={state.username}
        onChange={handleChange}
      />

      <TextInputLabel htmlFor="email">Email</TextInputLabel>
      <Input
        id="email"
        name="email"
        value={state.email}
        onChange={handleChange}
      />
      <TextInputLabel htmlFor="password">Password</TextInputLabel>
      <Input
        id="password"
        name="password"
        type="password"
        value={state.password}
        onChange={handleChange}
        data-testid="password"
      />
      <TextInputLabel htmlFor="repeatPassword">Repeat password</TextInputLabel>
      <Input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        value={state.repeatPassword}
        onChange={handleChange}
        data-testid="repeat-password"
      />

      <div className="checkboxes">
        <div className="checkbox__item">
          <input
            className="checkbox__input"
            id="isAdmin"
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label className="checkbox__label" htmlFor="isAdmin">
            Administrator
          </label>
        </div>
      </div>

      <Button disabled={formIsInvalid} type="submit">
        Sign Up
      </Button>
      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignUpLink = () => (
  <p>
    Don't have an account yet? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

const SignUpForm = compose<SignUpProps, {}>(
  withRouter,
  withFirebase,
)(SignUpFormData)

export default SignUp

export { SignUpForm, SignUpLink }
