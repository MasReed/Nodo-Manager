import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { addUserActionCreator } from '../../reducers/userReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const NewUserForm = ({ show, setShow }) => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const [ form, setForm ] = useState({
    name: '',
    email: '',
    username: '',
    roleName: 'user'
  })

  const [ errors, setErrors ] = useState({})

  // Easy form customization
  const formConfig = {
    name: {
      isEmpty: { errorMessage: 'A Name is required.' },
      maxLength: { value: 50, errorMessage: 'Name is too long' },
    },
    email: {
      isEmpty: { errorMessage: 'An Email is required.' },
      noAtSymbol: { errorMessage: `Email must include '@'` },
      minLength: { value: 5, errorMessage: 'Email is too short' },
      maxLength: { value: 50, errorMessage: 'Email is too long' },
    },
    username: {
      isEmpty: { errorMessage: 'Enter a username!' },
      minLength: { value: 2, errorMessage: 'Username is too short' },
      maxLength: { value: 30, errorMessage: 'Username is too long' },
    },
    roleName: {
      isEmpty: { errorMessage: 'A role must be selected.' },
      reqAdmin: { errorMessage: 'Requires Admin privileges.' },
      reqManager: { errorMessage: 'Requires Manager privileges.' },
      reqEmployee: { errorMessage: 'Requires Employee privileges.' },
    },
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
    const { name, email, username, roleName } = form
    const newErrors = {}
    // Name errors
    if (!name || name === '') {
      newErrors.name = formConfig.name.isEmpty.errorMessage

    } else if (name.length > formConfig.name.maxLength.value) {
      newErrors.name = formConfig.name.maxLength.errorMessage
    }

    // email errors
    if ( !email || email === '' ) {
      newErrors.email = formConfig.email.isEmpty.errorMessage

    } else if ( !email.includes('@') ) {
      newErrors.email = formConfig.email.noAtSymbol.errorMessage

    } else if ( email.length < formConfig.email.minLength.value ) {
      newErrors.email = formConfig.email.minLength.errorMessage
    }

    // username errors
    if ( !username || username === '' ) {
      newErrors.username = formConfig.username.isEmpty.errorMessage

    } else if ( username.length > formConfig.username.maxLength.value ) {
      newErrors.username = formConfig.username.maxLength.errorMessage

    } else if ( username.length < formConfig.username.minLength.value ) {
      newErrors.username = formConfig.username.minLength.errorMessage }

    // Role errors
    if (!roleName) {
      newErrors.roleName = formConfig.roleName.isEmpty.errorMessage

    } else if (roleName === 'admin' &&
    !currentUser.role.encompassedRoles.includes('admin')) {
      newErrors.roleName = formConfig.reqAdmin.errorMessage

    } else if (roleName === 'manager' &&
    !currentUser.role.encompassedRoles.includes('manager')) {
      newErrors.roleName = formConfig.reqManager.errorMessage

    } else if (roleName === 'employee' &&
    !currentUser.role.encompassedRoles.includes('manager')) {
      newErrors.roleName = formConfig.reqManager.errorMessage
    }

    return newErrors
  }

  //
  const createUser = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {

      try {
        const newUserObject = {
          name: form.name,
          email: form.email,
          username: form.username,
          password: 'password',
          role: {
            name: form.roleName
          }
        }

        await dispatch(addUserActionCreator(newUserObject))

        resetForm()

      } catch (err) {
        dispatch(toastAlertCreator(err))
      }
    }
  }

  //
  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      username: '',
      roleName: 'user'
    })
    setErrors({})
    setShow(false)
  }

  return (
    <Modal
      show={show}
      onHide={ resetForm }
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add A New User</Modal.Title>
      </Modal.Header>

      <AlertBanner />

      <Modal.Body>
        <Form id='newUserForm'>
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type='text'
              value={form.name.trim()}
              maxLength={formConfig.name.maxLength.value.toString()}
              placeholder='Jane Doe'
              onChange={ ({ target }) => setField('name', target.value) }
              isInvalid={ !!errors.name }
            />
            <Form.Text>
              {charactersRemaining(
                form.name, formConfig.name.maxLength.value
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
              minLength={formConfig.email.minLength.value.toString()}
              maxLength={formConfig.email.maxLength.value.toString()}
              placeholder='abc@123.com'
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

          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              value={form.username.trim()}
              minLength={formConfig.username.minLength.value.toString()}
              maxLength={formConfig.username.maxLength.value.toString()}
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
                onChange={ ({ target }) => setField('roleName', target.value) }
                isInvalid={ !!errors.roleName }
              />
              <Form.Check
                inline
                label='Manager'
                name='roles'
                type='radio'
                id='inline-radio-manager'
                checked={form.roleName === 'manager'}
                value='manager'
                onChange={ ({ target }) => setField('roleName', target.value) }
                isInvalid={ !!errors.roleName }
              />
              <Form.Check
                inline
                label='Employee'
                name='roles'
                type='radio'
                id='inline-radio-employee'
                checked={form.roleName === 'employee'}
                value='employee'
                onChange={ ({ target }) => setField('roleName', target.value) }
                isInvalid={ !!errors.roleName }
              />
              <Form.Check
                inline
                label='User'
                name='roles'
                type='radio'
                id='inline-radio-user'
                checked={form.roleName === 'user'}
                value='user'
                onChange={ ({ target }) => setField('roleName', target.value) }
                isInvalid={ !!errors.roleName }
              />
            </div>
            {
              errors.roleName &&
              <small style={{ color: '#dc3545'}}>{ errors.roleName }</small>
            }
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' onClick={ createUser }>Create User</Button>
        <Button variant='secondary' onClick={ resetForm }>Cancel</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default NewUserForm
