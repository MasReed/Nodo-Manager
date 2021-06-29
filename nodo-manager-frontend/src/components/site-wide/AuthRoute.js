import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = props => {

  const { authGroup } = props
  const userRoles = useSelector(state =>
    (state.currentUser && state.currentUser.role)
    ? state.currentUser.role.encompassedRoles
    : []
  )

  const authorizations = {
    admin: ['admin', 'manager', 'employee', 'user', 'guest'],
    manager: ['manager', 'employee', 'user', 'guest'],
    employee: ['employee', 'user', 'guest'],
    user: ['user', 'guest'],
    guest: ['guest']
  }

  console.log('auth[authgroup]', authorizations[authGroup])

  // Check if currentUser roles contain all required roles to access
  if (authorizations[authGroup].every(role => userRoles.includes(role))) {
    return <Route {...props} />
  } else {
    return <Redirect to='/' />
  }
}

export default AuthRoute
