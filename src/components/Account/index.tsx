import React from 'react'
import PasswordChange from '../PasswordChange'
import { withAuthorisation, UserContext } from '../Session'

import { H1 } from '../lib'

// type User = firebase.User

type User = {
  email: string
  roles: {
    ADMIN?: string
  }
  uid: string
  username: string
}

const Account = () => (
  <UserContext.Consumer>
    {user => (
      <div>
        <H1>Account: {user && user.username}</H1>
        <PasswordChange />
      </div>
    )}
  </UserContext.Consumer>
)

const condition = (user: User) => !!user
const selector = (user: User) => ({
  email: user.email,
  username: user.username,
})
export default withAuthorisation(condition, selector)(Account)
