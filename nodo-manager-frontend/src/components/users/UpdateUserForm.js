import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'

import { userForms } from '../../configurations/formConfigs'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { updateUserActionCreator } from '../../reducers/userReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const UpdateUserForm = ({ user, show, setShow }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    roleName: user.role.name,
  })

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
      name, email, username, roleName,
    } = form
    const newErrors = {}
    // Name errors
    if (!name || name === '') {
      newErrors.name = userForms.usersName.isEmpty.errorMessage
    } else if (name.length > userForms.usersName.maxLength.value) {
      newErrors.name = userForms.usersName.maxLength.errorMessage
    }

    // email errors
    if (!email || email === '') {
      newErrors.email = userForms.email.isEmpty.errorMessage
    } else if (!email.includes('@')) {
      newErrors.email = userForms.email.noAtSymbol.errorMessage
    } else if (email.length < userForms.email.minLength.value) {
      newErrors.email = userForms.email.minLength.errorMessage
    }

    // username errors
    if (!username || username === '') {
      newErrors.username = userForms.username.isEmpty.errorMessage
    } else if (username.length > userForms.username.maxLength.value) {
      newErrors.username = userForms.username.maxLength.errorMessage
    } else if (username.length < userForms.username.minLength.value) {
      newErrors.username = userForms.username.minLength.errorMessage
    }

    // Role errors
    if (!roleName) {
      newErrors.roleName = userForms.roleName.isEmpty.errorMessage
    } else if (roleName === 'admin'
    && !currentUser.role.encompassedRoles.includes('admin')) {
      newErrors.roleName = userForms.roleName.reqAdmin.errorMessage
    } else if (roleName === 'manager'
    && !currentUser.role.encompassedRoles.includes('manager')) {
      newErrors.roleName = userForms.roleName.reqManager.errorMessage
    } else if (roleName === 'employee'
    && !currentUser.role.encompassedRoles.includes('manager')) {
      newErrors.roleName = userForms.roleName.reqManager.errorMessage
    }

    return newErrors
  }

  //
  const resetForm = () => {
    setForm({
      name: user.name,
      email: user.email,
      username: user.username,
      roleName: user.role.name,
    })
    setErrors({})
    setShow(false)
  }

  //
  const updateUser = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const updatedUserObject = {
          ...user,
          name: form.name,
          email: form.email,
          username: form.username,
          password: null,
          role: {
            name: form.roleName,
          },
        }

        await dispatch(updateUserActionCreator(user.id, updatedUserObject))

        resetForm()
      } catch (err) {
        dispatch(toastAlertCreator(err))
      }
    }
  }

  return (
    <Modal
      show={show}
      onHide={resetForm}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Update
          {user.username}
        </Modal.Title>
      </Modal.Header>

      <AlertBanner />

      <Modal.Body>
        <Form id='newUserForm'>
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type='text'
              value={form.name.trim()}
              maxLength={userForms.usersName.maxLength.value.toString()}
              placeholder='Jane Doe'
              onChange={({ target }) => setField('name', target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Text>
              {charactersRemaining(
                form.name, userForms.usersName.maxLength.value,
              )}
            </Form.Text>

            <Form.Control.Feedback type='invalid'>
              { errors.name }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={form.email.trim()}
              minLength={userForms.email.minLength.value.toString()}
              maxLength={userForms.email.maxLength.value.toString()}
              placeholder='abc@123.com'
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

          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              value={form.username.trim()}
              minLength={userForms.username.minLength.value.toString()}
              maxLength={userForms.username.maxLength.value.toString()}
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

          <Form.Group>
            <Form.Label>Role:</Form.Label>
            <div className='px-4 d-flex justify-content-between'>
              <Form.Check
                inline
                label='Admin'
                name='roles'
                type='radio'
                id='inline-radio-admin'
                checked={form.roleName === 'admin'}
                value='admin'
                onChange={({ target }) => setField('roleName', target.value)}
                isInvalid={!!errors.roleName}
              />
              <Form.Check
                inline
                label='Manager'
                name='roles'
                type='radio'
                id='inline-radio-manager'
                checked={form.roleName === 'manager'}
                value='manager'
                onChange={({ target }) => setField('roleName', target.value)}
                isInvalid={!!errors.roleName}
              />
              <Form.Check
                inline
                label='Employee'
                name='roles'
                type='radio'
                id='inline-radio-employee'
                checked={form.roleName === 'employee'}
                value='employee'
                onChange={({ target }) => setField('roleName', target.value)}
                isInvalid={!!errors.roleName}
              />
              <Form.Check
                inline
                label='User'
                name='roles'
                type='radio'
                id='inline-radio-user'
                checked={form.roleName === 'user'}
                value='user'
                onChange={({ target }) => setField('roleName', target.value)}
                isInvalid={!!errors.roleName}
              />
            </div>
            {
              errors.roleName
              && <small style={{ color: '#dc3545' }}>{ errors.roleName }</small>
            }
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' onClick={updateUser}>Save Updates</Button>
        <Button variant='secondary' onClick={resetForm}>Cancel</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default UpdateUserForm
