/** @jsx jsx */
import { Global, jsx } from '@emotion/core'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from '../Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import PasswordForget from '../PasswordForget'
import Home from '../Home'
import Account from '../Account'
import Admin from '../Admin'
import Header from '../Header'

import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'
import * as colors from '../../styles/colors'
import globalStyles from './globalStyles'

const App = () => {
  return (
    <div
      css={{
        backgroundColor: colors.grey,
        color: '#333',
        position: 'relative',
        height: '100% !important',
      }}
    >
      <Global styles={globalStyles} />
      <Router>
        <Header />

        <div css={{ padding: '10px' }}>
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.ADMIN} component={Admin} />
        </div>
      </Router>
    </div>
  )
}

export default withAuthentication(App)
