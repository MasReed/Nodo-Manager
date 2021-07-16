import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { logoutUserActionCreator } from '../../reducers/currentUserReducer'

const LogoutButton = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserActionCreator())
      history.push('/')
      
    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  return (
    <Button
      onClick={ handleLogout }
      variant='outline-secondary'
      size='sm'
    >
      Logout
    </Button>
  )
}

export default LogoutButton
