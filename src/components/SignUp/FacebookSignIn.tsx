/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { facebookAuthProvider } from '../Firebase/firebase'

import { FormErrorPanel } from '../utils'

import * as ROUTES from '../../constants/routes'
import * as colors from '../../styles/colors'

import buttonNormal from '../../assets/icons/facebook/f_logo_RGB-Blue_58.png'
import buttonFocus from '../../assets/icons/facebook/f_logo_RGB-White_58.png'
import { withRouter } from 'react-router'

const facebookSignInStyles = css`
  height: 49px;
  position: relative;
  margin: 15px 0;

  .facebook-logo {
    height: 49px;
    position: absolute;
    top: 0;
    left: 0;
  }

  button {
    background: url(${buttonNormal}) #fff no-repeat 5px center;
    background-size: 41px;
    border: none;
    color: ${colors.facebookFocusBlue};
    line-height: 49px;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  button:hover,
  button:focus {
    background: url(${buttonFocus}) ${colors.facebookFocusBlue} no-repeat 5px
      center;
    background-size: 41px;
    color: white;
  }
`

interface FacebookSignInProps {
  firebase: firebase.app.App
  history: any
}

type Error = { message?: string }

const FacebookSignInBase = ({ firebase, history }: FacebookSignInProps) => {
  const [error, setError] = React.useState<Error>()

  const handleClick = () => {
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
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
    <>
      {error && error.message && <FormErrorPanel message={error.message} />}
      <div css={facebookSignInStyles}>
        <button onClick={() => handleClick()}>Facebook</button>
      </div>
    </>
  )
}

const FacebookSignIn = compose<FacebookSignInProps, {}>(
  withRouter,
  withFirebase,
)(FacebookSignInBase)

export default FacebookSignIn
