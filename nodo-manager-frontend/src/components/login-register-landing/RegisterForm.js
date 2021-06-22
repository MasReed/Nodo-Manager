import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { addUserActionCreator } from '../../reducers/userReducer'

const RegisterForm = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passCopy, setPassCopy] = useState('')

  const handleRegister = (event) => {
    event.preventDefault()

    if (password === passCopy) {

      const newUser = {
        email: email,
        username: username,
        password: password
      }

      try {
        dispatch(addUserActionCreator(newUser))
        setEmail('')
        setUsername('')
      } catch (exception) {
        console.log(exception)
      } finally {
        setPassword('')
        setPassCopy('')
      }
    } else {
      console.log('Your passwords did not match')
      setPassword('')
      setPassCopy('')
    }
  }

  return (
    <Form onSubmit={ handleRegister }>
      <Form.Group controlId='signupEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          value={email}
          placeholder='Enter email'
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </Form.Group>

      <Form.Group controlId='signupUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={username}
          placeholder='Username'
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </Form.Group>

      <Form.Group controlId='signupPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          placeholder='Password'
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </Form.Group>

      <Form.Group controlId='signupPasswordVerify'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          value={passCopy}
          placeholder='Password'
          onChange={ ({ target }) => setPassCopy(target.value) }
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Sign Up
      </Button>
    </Form>
  )
}

export default RegisterForm
