/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { UserContext } from '../Session'

import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

import SignOut from '../SignOut'
import { NavStatusContext } from '../Header'
import { useNavDispatch } from '../Header/Provider'

import * as mq from '../../styles/media-queries'
import * as colors from '../../styles/colors'
import { isMobile } from '../../utils'

import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

// types
import { User } from '../Session/withAuthorisation'

type P = {
  user: User
}

const UL = styled.ul`
  ${mq.medium} {
    list-style: none;
  }
`

const LI = styled.li`
  ${mq.medium} {
    display: inline;
    padding-left: 15px;
  }
`

export const NavToggle = () => {
  const dispatch = useNavDispatch()

  return (
    <NavStatusContext.Consumer>
      {state => {
        const action = state.navIsOpen ? 'close' : 'open'
        return (
          <div
            css={{
              [mq.medium]: { display: 'none' },
              [mq.large]: { display: 'none' },
              cursor: 'pointer',
              position: 'absolute',
              right: '15px',
              top: '0px',
            }}
            onClick={() => dispatch({ type: action })}
          >
            {state.navIsOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        )
      }}
    </NavStatusContext.Consumer>
  )
}

const Navigation = () => (
  <NavStatusContext.Consumer>
    {state => (
      <div
        css={{
          [mq.small]: {
            backgroundColor: colors.grey,
            display: state.navIsOpen ? 'block' : 'none',
            position: 'absolute',
            width: '100% !important',
            height: 'calc(100vh - 46px)',
            top: '46px',
            left: '0',
            padding: '15px 10px 0',
            zIndex: 1,
          },
          [mq.medium]: {
            position: 'absolute',
            top: '0',
            right: '15px',
            height: '45px',
            lineHeight: '45px',
          },
        }}
      >
        <UserContext.Consumer>
          {user =>
            user ? <AuthenticatedNav user={user} /> : <UnauthenticatedNav />
          }
        </UserContext.Consumer>
      </div>
    )}
  </NavStatusContext.Consumer>
)

const AuthenticatedNav = ({ user }: P) => {
  const dispatch = useNavDispatch()

  const handleClick = () => {
    if (isMobile()) {
      dispatch({ type: 'close' })
    }
  }

  return (
    <nav>
      <UL>
        <LI>
          <Link onClick={() => handleClick()} to={ROUTES.HOME}>
            Home
          </Link>
        </LI>
        <LI>
          <Link onClick={() => handleClick()} to={ROUTES.ACCOUNT}>
            Account
          </Link>
        </LI>
        {!!user.roles[ROLES.ADMIN] && (
          <LI>
            <Link onClick={() => handleClick()} to={ROUTES.ADMIN}>
              Admin
            </Link>
          </LI>
        )}
        <LI>
          <SignOut />
        </LI>
      </UL>
    </nav>
  )
}

const UnauthenticatedNav = () => {
  const dispatch = useNavDispatch()

  const handleClick = () => {
    if (isMobile()) {
      dispatch({ type: 'close' })
    }
  }

  return (
    <nav>
      <UL>
        <LI>
          <Link onClick={() => handleClick()} to={ROUTES.SIGN_IN}>
            Sign In
          </Link>
        </LI>
        <LI>
          <Link onClick={() => handleClick()} to={ROUTES.LANDING}>
            Landing
          </Link>
        </LI>
      </UL>
    </nav>
  )
}

export default Navigation
