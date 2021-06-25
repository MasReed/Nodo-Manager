import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { addUserActionCreator } from '../../reducers/userReducer'

const RegisterForm = () => {

  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const history = useHistory()

  const [ form, setForm ] = useState(
    { email: '', username: '', password: '', passcopy: '' }
  )
  const [ errors, setErrors ] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Remove any errors from the error object
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { email, username, password, passcopy } = form
    const newErrors = {}
    // email errors
    if ( !email || email === '' ) newErrors.email='Enter an email!'
    else if ( !email.includes('@') ) newErrors.email='Email must include @'

    // username errors
    if ( !username || username === '' ) newErrors.username = 'Enter a username!'
    else if ( username.length > 30 ) newErrors.username = 'Username is too long'
    else if ( username.length < 5 ) newErrors.username = 'Username is too short'

    // password errors
    if ( !password || password === '' ) newErrors.password = 'Enter a password!'
    else if ( password.length < 5 ) newErrors.password = 'Password is too short'

    // passcopy errors
    if ( !passcopy || passcopy === '' ) newErrors.passcopy = 'Reenter your password!'
    else if ( password !== passcopy ) newErrors.passcopy = 'Passwords do not match!'

    return newErrors
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {
      try {
        const newUser = {
          name: form.username,
          email: form.email,
          username: form.username,
          password: form.password
        }

        await dispatch(addUserActionCreator(newUser, currentUser))
        setForm({ email: '', username: '', password: '', passcopy: '' })
        history.push('/menu')

      } catch (err) {
        setForm({
          email: form.email,
          username: form.username,
          password: '',
          passcopy: ''
        })

        if (err.response) {
          console.log(err.response.data.message)
        } else if (err.request) {
          console.log('err.req', err.request)
        } else {
          console.log(err)
        }
      }
    }
  }

  return (
    <Form>
      <Form.Group controlId='signupEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          value={form.email}
          placeholder='Enter email'
          onChange={ ({ target }) => setField('email', target.value) }
          isInvalid={ !!errors.email }
        />
        <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='signupUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={form.username}
          placeholder='Username'
          onChange={ ({ target }) => setField('username', target.value) }
          isInvalid={ !!errors.username }
        />
        <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='signupPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={form.password}
          placeholder='Password'
          onChange={ ({ target }) => setField('password', target.value) }
          isInvalid={ !!errors.password }
        />
        <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='signupPasswordVerify'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          value={form.passcopy}
          placeholder='Password'
          onChange={ ({ target }) => setField('passcopy', target.value) }
          isInvalid={ !!errors.passcopy }
        />
        <Form.Control.Feedback type='invalid'>{ errors.passcopy }</Form.Control.Feedback>
      </Form.Group>

      <Button variant='primary' type='submit' onClick={ handleRegister }>
        Sign Up
      </Button>
    </Form>
  )
}

export default RegisterForm
