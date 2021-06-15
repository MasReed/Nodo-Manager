import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import authServices from '../services/authentications'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      authServices.login(username, password)
      setUsername('')
    } catch (exception) {
      console.log(exception)
    } finally {
      setPassword('')
    }
  }

  return (
    <Form id='loginForm' onSubmit={ handleLogin }>
      <Form.Group controlId='loginUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={username}
          placeholder='Username'
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </Form.Group>

      <Form.Group controlId='loginPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          placeholder='Password'
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
