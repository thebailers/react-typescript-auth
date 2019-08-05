import React from 'react'

// type User = firebase.User

type User = {
  email: string
  roles: {
    ADMIN?: string
  }
  uid: string
  username: string
}

const UserContext = React.createContext<User | null>(null)
export default UserContext
