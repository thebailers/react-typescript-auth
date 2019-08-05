import React from 'react'
import firebaseApp from './firebase'

const FirebaseContext = React.createContext<firebase.app.App>(firebaseApp)

export const withFirebase = (
  Component: React.ComponentType<{ firebase: firebase.app.App }>,
) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext
