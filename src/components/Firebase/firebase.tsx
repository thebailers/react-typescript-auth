import firebase from 'firebase'
import config from '../../config'

const firebaseApp = firebase.initializeApp(config.firebaseConf)

type User = {
  email: string
  roles: {
    ADMIN?: string
  }
  uid: string
  username: string
}

type Next = (user: User) => void
type Fallback = (value: React.SetStateAction<User | null>) => void

export const onAuthUserListener = (next: Next, fallback: Fallback) =>
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase
        .database()
        .ref(`users/${user.uid}`)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val()

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {}
          }

          // merge auth & db users
          const authUser = {
            uid: user!.uid,
            email: user!.email,
            ...dbUser,
          }

          if (user) {
            next(authUser)
          }
        })
    } else {
      fallback(null)
    }
  })

export default firebaseApp
export const database = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
