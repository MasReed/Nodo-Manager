import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { addUserActionCreator } from '../../reducers/userReducer'
import charactersRemaining from '../../utilities/charactersRemaining'


const RegisterForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector(state => state.currentUser)

  const [ form, setForm ] = useState(
    { email: '', username: '', password: '', passcopy: '' }
  )
  const [ errors, setErrors ] = useState({})

  // Easy form customization
  const formConfig = {
    email: {
      isEmpty: { errorMessage: 'Enter an email!' },
      noAtSymbol: { errorMessage: `Email must include '@'` },
      minLength: { value: 5, errorMessage: 'Email is too short' },
      maxLength: { value: 50, errorMessage: 'Email is too long' },
    },
    username: {
      isEmpty: { errorMessage: 'Enter a username!' },
      minLength: { value: 2, errorMessage: 'Username is too short' },
      maxLength: { value: 30, errorMessage: 'Username is too long' },
    },
    password: {
      isEmpty: { errorMessage: 'Enter a password!' },
      minLength: { value: 5, errorMessage: 'Password is too short' },
      maxLength: { value: 50, errorMessage: 'Password is too long' },
    },
    passcopy: {
      isEmpty: { errorMessage: 'Reenter your password!' },
      mismatched: { errorMessage: 'Passwords do not match!'}
    }
  }

  //
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

  //
  const findFormErrors = () => {
    const { email, username, password, passcopy } = form
    const newErrors = {}

    // email errors
    if ( !email || email === '' ) {
      newErrors.email = formConfig.email.isEmpty.errorMessage

    } else if ( !email.includes('@') ) {
      newErrors.email = formConfig.email.noAtSymbol.errorMessage

    } else if (email.length < formConfig.email.minLength.value) {
      newErrors.email = formConfig.email.minLength.errorMessage
      
    } else if (email.length > formConfig.email.maxLength.value) {
      newErrors.email = formConfig.email.maxLength.errorMessage
    }

    // username errors
    if ( !username || username === '' ) {
      newErrors.username = formConfig.username.isEmpty.errorMessage

    } else if ( username.length > formConfig.username.maxLength.value ) {
      newErrors.username = formConfig.username.maxLength.errorMessage

    } else if ( username.length < formConfig.username.minLength.value ) {
      newErrors.username = formConfig.username.minLength.errorMessage }

    // password errors
    if ( !password || password === '' ) {
      newErrors.password = formConfig.password.isEmpty.errorMessage

    } else if ( password.length > formConfig.password.maxLength.value ) {
      newErrors.name = formConfig.password.maxLength.errorMessage

    } else if ( password.length < formConfig.password.minLength.value ) {
      newErrors.password = formConfig.password.minLength.errorMessage
    }

    // passcopy errors
    if ( !passcopy || passcopy === '' ) {
      newErrors.passcopy = formConfig.passcopy.isEmpty.errorMessage

    } else if ( password !== passcopy ) {
      newErrors.passcopy = formConfig.passcopy.mismatched.errorMessage
    }

    return newErrors
  }

  //
  const handleSubmitRegister = async (event) => {
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

        await dispatch(toastAlertCreator(err))
      }
    }
  }

  return (
    <Form id='register-form'>

      {/* Email */}
      <Form.Group controlId='register-email'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          value={form.email.trim()}
          minLength={formConfig.email.minLength.value.toString()}
          maxLength={formConfig.email.maxLength.value.toString()}
          placeholder='Enter email'
          onChange={ ({ target }) => setField('email', target.value) }
          isInvalid={ !!errors.email }
        />
        <Form.Text>
          {charactersRemaining(
            form.email, formConfig.email.maxLength.value
          )}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.email }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Username */}
      <Form.Group controlId='register-username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={form.username.trim()}
          minLength={formConfig.username.minLength.value.toString()}
          maxLength={formConfig.username.maxLength.value.toString()}
          placeholder='Username'
          onChange={ ({ target }) => setField('username', target.value) }
          isInvalid={ !!errors.username }
        />
        <Form.Text>
          {charactersRemaining(
            form.username, formConfig.username.maxLength.value
          )}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.username }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Password */}
      <Form.Group controlId='register-password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={form.password.trim()}
          minLength={formConfig.password.minLength.value.toString()}
          maxLength={formConfig.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={ ({ target }) => setField('password', target.value) }
          isInvalid={ !!errors.password }
        />
        <Form.Text>
          {charactersRemaining(
            form.password, formConfig.password.maxLength.value
          )}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.password }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Password Copy */}
      <Form.Group controlId='register-passcopy'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          value={form.passcopy.trim()}
          minLength={formConfig.password.minLength.value.toString()}
          maxLength={formConfig.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={ ({ target }) => setField('passcopy', target.value) }
          isInvalid={ !!errors.passcopy }
        />
        <Form.Text>
          {charactersRemaining(
            form.passcopy, formConfig.password.maxLength.value
          )}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.passcopy }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Submit Button */}
      <Button
        id='register-submit-button'
        variant='primary'
        type='submit'
        onClick={ handleSubmitRegister }
      >
        Sign Up
      </Button>
    </Form>
  )
}

export default RegisterForm
