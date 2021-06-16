import React from 'react'

import Button from 'react-bootstrap/Button'

import { unsetUserActionCreator } from '../../reducers/currentUserReducer'

const LogoutButton = () => {

  return (
    <Button
      onClick={ unsetUserActionCreator }
      variant='outline-secondary'
      size='sm'
    >
      Logout
    </Button>
  )
}

export default LogoutButton
