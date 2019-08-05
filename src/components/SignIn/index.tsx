/** @jsx jsx */
import { jsx } from '@emotion/core'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import * as colors from '../../styles/colors'

import SignInForm from './SignInForm'
import Or from '../SignUp/or'
import GoogleSignIn from '../SignUp/GoogleSignIn'
import FacebookSignIn from '../SignUp/FacebookSignIn'

const SignIn = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <div css={{ textAlign: 'center', marginTop: '25px', color: colors.grey20 }}>
      <PasswordForgetLink />
      <SignUpLink />
      <Or />
      <GoogleSignIn />
      <FacebookSignIn />
    </div>
  </div>
)

export default SignIn
