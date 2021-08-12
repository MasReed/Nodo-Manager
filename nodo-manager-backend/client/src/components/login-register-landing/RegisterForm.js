import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { userForms } from '../../configurations/formConfigs'
import useForm from '../../hooks/useForm'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { addUserActionCreator } from '../../reducers/userReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((state) => state.currentUser)

  const [form, setForm, errors, isValidated] = useForm(
    {
      email: '', username: '', password: '', passcopy: '',
    },
  )

  //
  const handleSubmitRegister = async (event) => {
    event.preventDefault()

    if (isValidated()) {
      try {
        const newUser = {
          name: form.username,
          email: form.email,
          username: form.username,
          password: form.password,
        }

        await dispatch(addUserActionCreator(newUser, currentUser))

        setForm(['email', 'username', 'password', 'passcopy'], '')

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
          value={form.email.trimStart()}
          minLength={userForms.email.minLength.value.toString()}
          maxLength={userForms.email.maxLength.value.toString()}
          placeholder='Enter email'
          onChange={({ target }) => setForm('email', target.value)}
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
          value={form.username.trimStart()}
          minLength={userForms.username.minLength.value.toString()}
          maxLength={userForms.username.maxLength.value.toString()}
          placeholder='Username'
          onChange={({ target }) => setForm('username', target.value)}
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
          value={form.password.trimStart()}
          minLength={userForms.password.minLength.value.toString()}
          maxLength={userForms.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={({ target }) => setForm('password', target.value)}
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
          value={form.passcopy.trimStart()}
          minLength={userForms.password.minLength.value.toString()}
          maxLength={userForms.password.maxLength.value.toString()}
          placeholder='Password'
          onChange={({ target }) => setForm('passcopy', target.value)}
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
