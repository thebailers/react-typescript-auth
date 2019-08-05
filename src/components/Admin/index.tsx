import React from 'react'
import { withAuthorisation } from '../Session'

import * as ROLES from '../../constants/roles'

// types
import { User } from '../Session/withAuthorisation'

interface Props {
  firebase: firebase.app.App
}

const Admin = ({ firebase }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [users, setUsers] = React.useState<U[]>([])

  React.useEffect(() => {
    setIsLoading(true)

    const usersRef = firebase.database().ref(`users/`)

    usersRef.on(`value`, (snapshot: any) => {
      const usersObj = snapshot.val()
      const usersLi = Object.keys(usersObj).map(key => ({
        ...usersObj[key],
        uid: key,
      }))
      setUsers(usersLi)
    })

    setIsLoading(false)

    return () => usersRef.off()
  }, [firebase])

  return (
    <div>
      <h1>Admin</h1>
      {isLoading && <p>Fetching data...</p>}

      <UserList users={users} />
    </div>
  )
}

interface U {
  uid: string
  username: string
  email: string
}

interface UL {
  users: U[]
}

const UserList = ({ users }: UL) => (
  <ul>
    {users.map(user => (
      <li
        key={user.uid}
        style={{
          borderBottom: '1px solid #f4f4f4',
          paddingBottom: '10px',
          marginBottom: '10px',
        }}
      >
        <span style={{ display: 'block' }}>
          <strong>ID:</strong> {user.uid}
        </span>
        <span style={{ display: 'block' }}>
          <strong>username:</strong> {user.username}
        </span>
        <span style={{ display: 'block' }}>
          <strong>Email:</strong> {user.email}
        </span>
      </li>
    ))}
  </ul>
)

const condition = (user: User) => user && !!user.roles[ROLES.ADMIN]
export default withAuthorisation(condition)(Admin)
