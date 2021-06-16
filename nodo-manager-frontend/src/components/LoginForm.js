import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { loginUserActionCreator } from '../reducers/currentUserReducer'


const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(loginUserActionCreator(username, password))
    setUsername('')
    setPassword('')
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
