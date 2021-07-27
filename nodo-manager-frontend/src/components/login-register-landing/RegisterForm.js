import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { userForms } from '../../configurations/formConfigs'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { addUserActionCreator } from '../../reducers/userReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((state) => state.currentUser)

  const [form, setForm] = useState(
    {
      email: '', username: '', password: '', passcopy: '',
    },
  )
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
    const {
      email, username, password, passcopy,
    } = form
    const newErrors = {}

    // email errors
    if (!email || email === '') {
      newErrors.email = userForms.email.isEmpty.errorMessage
    } else if (!email.includes('@')) {
      newErrors.email = userForms.email.noAtSymbol.errorMessage
    } else if (email.length < userForms.email.minLength.value) {
      newErrors.email = userForms.email.minLength.errorMessage
    } else if (email.length > userForms.email.maxLength.value) {
      newErrors.email = userForms.email.maxLength.errorMessage
    }

    // username errors
    if (!username || username === '') {
      newErrors.username = userForms.username.isEmpty.errorMessage
    } else if (username.length > userForms.username.maxLength.value) {
      newErrors.username = userForms.username.maxLength.errorMessage
    } else if (username.length < userForms.username.minLength.value) {
      newErrors.username = userForms.username.minLength.errorMessage
    }

    // password errors
    if (!password || password === '') {
      newErrors.password = userForms.password.isEmpty.errorMessage
    } else if (password.length > userForms.password.maxLength.value) {
      newErrors.name = userForms.password.maxLength.errorMessage
    } else if (password.length < userForms.password.minLength.value) {
      newErrors.password = userForms.password.minLength.errorMessage
    }

    // passcopy errors
    if (!passcopy || passcopy === '') {
      newErrors.passcopy = userForms.passcopy.isEmpty.errorMessage
    } else if (password !== passcopy) {
      newErrors.passcopy = userForms.passcopy.mismatched.errorMessage
    }

    return newErrors
  }

  //
  const handleSubmitRegister = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const newUser = {
          name: form.username,
          email: form.email,
          username: form.username,
          password: form.password,
        }

        await dispatch(addUserActionCreator(newUser, currentUser))

        setForm({
          email: '', username: '', password: '', passcopy: '',
        })

        history.push('/menu')
      } catch (err) {
        setForm({
          email: form.email,
          username: form.username,
          password: '',
          passcopy: '',
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
          minLength={userForms.email.minLength.value.toString()}
          maxLength={userForms.email.maxLength.value.toString()}
          placeholder='Enter email'
          onChange={({ target }) => setField('email', target.value)}
          isInvalid={!!errors.email}
        />
        <Form.Text>
          {charactersRemaining(
            form.email, userForms.email.maxLength.value,
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
          minLength={userForms.username.minLength.value.toString()}
          maxLength={userForms.username.maxLength.value.toString()}
          placeholder='Username'
          onChange={({ target }) => setField('username', target.value)}
          isInvalid={!!errors.username}
        />
        <Form.Text>
          {charactersRemaining(
            form.username, userForms.username.maxLength.value,
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
          minLength={userForms.password.minLength.value.toString()}
          maxLength={userForms.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={({ target }) => setField('password', target.value)}
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

      {/* Password Copy */}
      <Form.Group controlId='register-passcopy'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          value={form.passcopy.trim()}
          minLength={userForms.password.minLength.value.toString()}
          maxLength={userForms.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={({ target }) => setField('passcopy', target.value)}
          isInvalid={!!errors.passcopy}
        />
        <Form.Text>
          {charactersRemaining(
            form.passcopy, userForms.password.maxLength.value,
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
        onClick={handleSubmitRegister}
      >
        Sign Up
      </Button>
    </Form>
  )
}

export default RegisterForm
