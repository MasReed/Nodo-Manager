import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { userForms } from '../../configurations/formConfigs'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { loginUserActionCreator, logoutUserActionCreator } from '../../reducers/currentUserReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const LoginForm = ({ ...props }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [form, setForm] = useState({ name: '', password: '' })
  const [errors, setErrors] = useState({})

  //
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })
    // Remove any errors from the error object
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      })
    }
  }

  //
  const findFormErrors = () => {
    const { name, password } = form
    const newErrors = {}

    // name errors
    if (!name || name === '') {
      newErrors.name = userForms.username.isEmpty.errorMessage
    } else if (name.length > userForms.username.maxLength.value) {
      newErrors.name = userForms.username.maxLength.errorMessage
    } else if (name.length < userForms.username.minLength.value) {
      newErrors.name = userForms.username.minLength.errorMessage
    }

    // password errors
    if (!password || password === '') {
      newErrors.password = userForms.password.isEmpty.errorMessage
    } else if (password.length > userForms.password.maxLength.value) {
      newErrors.name = userForms.password.maxLength.errorMessage
    } else if (password.length < userForms.password.minLength.value) {
      newErrors.password = userForms.password.minLength.errorMessage
    }

    return newErrors
  }

  //
  const handleSubmitLogin = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        await dispatch(logoutUserActionCreator())
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

  return (
    <Form id='login-form'>
      {/* Login Username */}
      <Form.Group controlId='login-username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={form.name.trim()}
          minLength={userForms.username.minLength.value.toString()}
          maxLength={userForms.username.maxLength.value.toString()}
          placeholder='Username'
          onChange={(e) => setField('name', e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Text>
          {charactersRemaining(form.name, userForms.username.maxLength.value)}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.name }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Login Password */}
      <Form.Group controlId='login-password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={form.password.trim()}
          minLength={userForms.password.minLength.value.toString()}
          maxLength={userForms.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={(e) => setField('password', e.target.value)}
          isInvalid={!!errors.password}
        />
        <Form.Text>
          {charactersRemaining(
            form.password, userForms.password.maxLength.value,
          )}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.password }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Submit */}
      <Button
        id='login-submit-button'
        type='submit'
        onClick={handleSubmitLogin}
      >
        Login
      </Button>
    </Form>
  )
}

export default LoginForm

// Form validation built on work from:
// https://github.com/AlecGrey/demo-form-for-blog
