/* eslint-disable */

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { userForms } from '../../configurations/formConfigs'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { loginUserActionCreator } from '../../reducers/currentUserReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

import useForm from '../../hooks/useForm'

const LoginForm = ({ ...props }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [form, setForm, errors, validateOnSubmit] = useForm({ username: '', password: '' })

  //
  const handleSubmitLogin = async (event) => {
    event.preventDefault()

    if (validateOnSubmit()) {
      try {

        await dispatch(loginUserActionCreator(form.username, form.password))

        if (props.setShow) {
          props.setShow(false)
        }

        // setForm({ name: '', password: '' })

        history.push('/menu')
      } catch (err) {
        // setField('password', '')
        await dispatch(toastAlertCreator(err))
      }
    } else {
      return false
    }
  }

  return (
    <Form id='login-form'>
      {/* Login Username */}
      <Form.Group controlId='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={form.username.trim()}
          minLength={userForms.username.minLength.value.toString()}
          maxLength={userForms.username.maxLength.value.toString()}
          placeholder='Username'
          onChange={setForm}
          isInvalid={!!errors.username}
        />
        <Form.Text>
          {charactersRemaining(form.username, userForms.username.maxLength.value)}
        </Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.username }
        </Form.Control.Feedback>
      </Form.Group>

      {/* Login Password */}
      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={form.password.trim()}
          minLength={userForms.password.minLength.value.toString()}
          maxLength={userForms.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={setForm}
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
