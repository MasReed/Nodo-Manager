import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'

import { logoutUserActionCreator } from '../../reducers/currentUserReducer'

const LogoutButton = () => {

  const dispatch = useDispatch()

  return (
    <Button
      onClick={ () => dispatch(logoutUserActionCreator()) }
      variant='outline-secondary'
      size='sm'
    >
      Logout
    </Button>
  )
}

export default LogoutButton
