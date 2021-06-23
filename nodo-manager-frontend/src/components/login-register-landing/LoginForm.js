import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { loginUserActionCreator } from '../../reducers/currentUserReducer'

const LoginForm = ({ ...props }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [ form, setForm ] = useState({ name: '', password: '' })
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

  const handleSubmit = async (event) => {
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
      } catch (exception) {
        console.log(exception)
        setField('password', '')
      }
    }
  }

  const findFormErrors = () => {
    const { name, password } = form
    const newErrors = {}
    // name errors
    if ( !name || name === '' ) newErrors.name = 'Enter a username!'
    else if ( name.length > 30 ) newErrors.name = 'Username is too long'
    else if ( name.length < 3 ) newErrors.name = 'Username is too short'
    // password errors
    if ( !password || password === '' ) newErrors.password = 'Enter a password!'

    return newErrors
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={form.name}
          placeholder='Username'
          onChange={ e => setField('name', e.target.value) }
          isInvalid={ !!errors.name }
        />
        <Form.Control.Feedback type='invalid'>{ errors.name }</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={form.password}
          placeholder='Password'
          onChange={ e => setField('password', e.target.value) }
          isInvalid={ !!errors.password }
        >
        </Form.Control>
        <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
      </Form.Group>

      <Button type='submit' onClick={ handleSubmit }>Login</Button>
    </Form>
  )
}

export default LoginForm

// Form validation built on work from: https://github.com/AlecGrey/demo-form-for-blog
