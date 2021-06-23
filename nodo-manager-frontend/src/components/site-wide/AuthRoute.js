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

  if (userRoles.includes(authGroup.toString().toLowerCase())) {
    return <Route {...props} />
  } else {
    return <Redirect to='/' />
  }
}

export default AuthRoute
