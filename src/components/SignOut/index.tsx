import React from 'react'
import { withFirebase } from '../Firebase'
import { useNavDispatch } from '../Header/Provider'

import { LinkButton } from '../lib'

interface P {
  firebase: firebase.app.App
}

export const SignOut = ({ firebase }: P) => {
  const dispatch = useNavDispatch()

  return (
    <LinkButton
      onClick={() => {
        firebase
          .auth()
          .signOut()
          .then(() => dispatch({ type: 'close' }))
      }}
    >
      SignOut
    </LinkButton>
  )
}

export default withFirebase(SignOut)
