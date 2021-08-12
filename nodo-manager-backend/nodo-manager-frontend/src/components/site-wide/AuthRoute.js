import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = (props) => {
  const { authGroup } = props

  const userRoles = useSelector(
    (state) => ((state.currentUser && state.currentUser.role)
      ? state.currentUser.role.encompassedRoles
      : []),
  )

  // Encompassing roles i.e. a manager is every other role sans admin
  const authorizations = {
    admin: ['admin', 'manager', 'employee', 'user', 'guest'],
    manager: ['manager', 'employee', 'user', 'guest'],
    employee: ['employee', 'user', 'guest'],
    user: ['user', 'guest'],
    guest: ['guest'],
  }

  // Redirect or render if currentUser hass all roles required for access
  if (authorizations[authGroup].every((role) => userRoles.includes(role))) {
    /* eslint-disable react/jsx-props-no-spreading */
    return <Route {...props} />
  }
  return <Redirect to='/' />
}

export default AuthRoute
