import React from 'react'
import UserContext from './context'
import { withFirebase } from '../Firebase'
import { onAuthUserListener } from '../Firebase/firebase'

interface P {
  firebase: firebase.app.App
}

// type User = firebase.User

type User = {
  email: string
  roles: {
    ADMIN?: string
  }
  uid: string
  username: string
}

const withAuthentication = (Component: React.ComponentType) => {
  const WithAuthentication = ({ firebase, ...props }: P) => {
    const [user, setUser] = React.useState<User | null>(null)

    React.useEffect(() => {
      const unsub = onAuthUserListener(
        (user: User) => setUser(user),
        () => setUser(null),
      )

      return () => unsub()
    })

    return (
      <UserContext.Provider value={user}>
        <Component {...props} />
      </UserContext.Provider>
    )
  }
  return withFirebase(WithAuthentication)
}

export default withAuthentication
