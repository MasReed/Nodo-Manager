import React from 'react'

import Button from 'react-bootstrap/Button'

const LoginButton = ({ setShow }) => (
  <Button
    onClick={() => setShow(true)}
    variant='outline-secondary'
    size='sm'
  >
    Login
  </Button>
)

export default LoginButton
