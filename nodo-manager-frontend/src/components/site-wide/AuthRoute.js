import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = props => {

  const { authGroup } = props
  const userRoles = useSelector(state =>
    (state.currentUser && state.currentUser.roles)
    ? state.currentUser.roles
    : []
  )

  if (userRoles.includes('ROLE_' + authGroup.toString().toUpperCase())) {
    return <Route {...props} />
  } else {
    return <Redirect to='/' />
  }
}

export default AuthRoute
