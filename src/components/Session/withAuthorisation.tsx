import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import UserContext from './context'

import { onAuthUserListener } from '../Firebase/firebase'

export type User = {
  email: string
  roles: {
    ADMIN?: string
  }
  uid: string
  username: string
}

type Condition = (user: User) => boolean
type Selector = (user: User) => object

interface Props {
  firebase: firebase.app.App
  history: any
}

const withAuthorisation = (condition: Condition, selector?: Selector) => (
  Component: React.ComponentType<Props>,
) => {
  const WithAuthorisation = ({ firebase, ...props }: Props) => {
    React.useEffect(() => {
      const unsub = onAuthUserListener(
        user => {
          if (!condition(user)) {
            props.history.push(ROUTES.SIGN_IN)
          }
        },
        () => props.history.push(ROUTES.SIGN_IN),
      )

      return unsub()
    })

    return (
      <UserContext.Consumer>
        {user => {
          // Guard condition technique
          if (!condition(user!)) {
            return null
          }

          let contextProps
          if (user && selector) {
            contextProps = selector(user) // return only required props
          }

          return <Component firebase={firebase} {...props} {...contextProps} />
        }}
      </UserContext.Consumer>
    )
  }

  return compose<Props, {}>(
    withRouter,
    withFirebase,
  )(WithAuthorisation)
}

export default withAuthorisation
