/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { googleAuthProvider } from '../Firebase/firebase'

import { FormErrorPanel } from '../utils'

import * as ROUTES from '../../constants/routes'
import * as colors from '../../styles/colors'

import buttonNormal from '../../assets/icons/google/btn_google_dark_normal_ios.svg'
import buttonFocus from '../../assets/icons/google/btn_google_dark_focus_ios.svg'
import { withRouter } from 'react-router'

const googleSignInStyles = css`
  height: 49px;
  position: relative;
  margin: 15px 0;

  .google-logo {
    height: 49px;
    position: absolute;
    top: 0;
    left: 0;
  }

  button {
    background: url(${buttonNormal}) #fff no-repeat left top;
    background-size: 49px;
    border: none;
    color: ${colors.grey20};
    line-height: 49px;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  button:hover,
  button:focus {
    background: url(${buttonFocus}) ${colors.googleFocusBlue} no-repeat left top;
    background-size: 49px;
    color: white;
  }
`

interface GoogleSignInProps {
  firebase: firebase.app.App
  history: any
}

type Error = { message?: string }

const GoogleSignInBase = ({ firebase, history }: GoogleSignInProps) => {
  const [error, setError] = React.useState<Error>()

  const handleClick = () => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(res => {
        if (res && res.user) {
          return firebase
            .database()
            .ref(`users/${res.user.uid}`)
            .set({
              username: res.user.displayName,
              email: res.user.email,
            })
        } else {
          // TODO: Make this a user friendly displayed error in the UI - something went wrong
          throw new Error('res or res.user is not defined')
        }
      })
      .then(() => history.push(ROUTES.HOME))
      .catch(error => setError(error))
  }

  return (
    <div css={googleSignInStyles}>
      {error && error.message && <FormErrorPanel message={error.message} />}
      <button onClick={() => handleClick()}>Google</button>
    </div>
  )
}

const GoogleSignIn = compose<GoogleSignInProps, {}>(
  withRouter,
  withFirebase,
)(GoogleSignInBase)

export default GoogleSignIn
