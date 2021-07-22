import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { loginUserActionCreator } from '../../reducers/currentUserReducer'

import charactersRemaining from '../../utilities/charactersRemaining'

const LoginForm = ({ ...props }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [ form, setForm ] = useState({ name: '', password: '' })
  const [ errors, setErrors ] = useState({})

  // Easy form customization
  const formConfig = {
    username: {
      isEmpty: { errorMessage: 'Enter a username!' },
      minLength: { value: 2, errorMessage: 'Username is too short' },
      maxLength: { value: 30, errorMessage: 'Username is too long' },
    },

    password: {
      isEmpty: { errorMessage: 'Enter a password!' },
      minLength: { value: 5, errorMessage: 'Password is too short' },
      maxLength: { value: 50, errorMessage: 'Password is too long' },
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
  const handleSubmitLogin = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {

      try {
        await dispatch(loginUserActionCreator(form.name, form.password))

        if (props.setShow) {
          props.setShow(false)
        }

        setForm({ name: '', password: '' })

        history.push('/menu')

      } catch (err) {
        setField('password', '')
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  //
  const findFormErrors = () => {
    const { name, password } = form
    const newErrors = {}

    // name errors
    if ( !name || name === '' ) {
      newErrors.name = formConfig.username.isEmpty.errorMessage

    } else if ( name.length > formConfig.username.maxLength.value ) {
      newErrors.name = formConfig.username.maxLength.errorMessage

    } else if ( name.length < formConfig.username.minLength.value ) {
      newErrors.name = formConfig.username.minLength.errorMessage }

    // password errors
    if ( !password || password === '' ) {
      newErrors.password = 'Enter a password!'

    } else if ( password.length > formConfig.password.maxLength.value ) {
      newErrors.name = formConfig.password.maxLength.errorMessage

    } else if ( password.length < formConfig.password.minLength.value ) {
      newErrors.password = formConfig.password.minLength.errorMessage
    }

    return newErrors
  }

  return (
    <Form>
      {/* Login Username */}
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={form.name.trim()}
          minLength={formConfig.username.minLength.value.toString()}
          maxLength={formConfig.username.maxLength.value.toString()}
          placeholder='Username'
          onChange={ e => setField('name', e.target.value) }
          isInvalid={ !!errors.name }
        />
        <Form.Text>
          {charactersRemaining(form.name, formConfig.username.maxLength.value)}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.name }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Login Password */}
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={form.password.trim()}
          minLength={formConfig.password.minLength.value.toString()}
          maxLength={formConfig.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={ e => setField('password', e.target.value) }
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

      {/* Submit */}
      <Button type='submit' onClick={ handleSubmitLogin }>Login</Button>
    </Form>
  )
}

export default LoginForm

// Form validation built on work from:
// https://github.com/AlecGrey/demo-form-for-blog
