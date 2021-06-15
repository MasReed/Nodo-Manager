import React from 'react'

import Button from 'react-bootstrap/Button'

import authServices from '../../services/authentications'

const LogoutButton = () => {

  return (
    <Button
      onSubmit={ () => authServices.logout() }
      variant='outline-secondary'
      size='sm'
    >
      Logout
    </Button>
  )
}

export default LogoutButton
