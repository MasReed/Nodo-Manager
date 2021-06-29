import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { addUserActionCreator } from '../../reducers/userReducer'


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
    const { name, email, username, roleName } = form
    const newErrors = {}
    // Name errors
    if (!name || name === '') newErrors.name = 'A Name is required.'

    // Email errors
    if (!email || email === '') newErrors.email = 'An Email is required.'
    else if (!email.includes('@')) newErrors.email = 'Email must include @'

    // username errors
    if (!username || username === '') newErrors.username = 'Enter a username!'
    else if (username.length > 30) newErrors.username = 'Username is too long'
    else if (username.length < 5) newErrors.username = 'Username is too short'

    // Role errors
    if (!roleName) newErrors.roleName = 'A role must be selected.'
    else if (roleName === 'admin' && !currentUser.role.encompassedRoles.includes('admin'))
      newErrors.roleName = 'Requires admin privileges.'
    else if (roleName === 'manager' && !currentUser.role.encompassedRoles.includes('manager'))
      newErrors.roleName = 'Requires manager privileges.'


    return newErrors
  }


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

        setForm({ name: '', email: '', username: '', roleName: 'user' })
        setShow(false)

      } catch (err) {

        if (err.response) {
          console.log('NewUserForm', err.response.data.message)
          dispatch(toastAlertCreator({ message: err.response.data.message }))
        } else if (err.request) {
          console.log('err.req', err.request)
        } else {
          console.log(err)
        }
      }
    }
  }

  const cancelNewUser = () => {
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
      onHide={ cancelNewUser }
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
              value={form.name}
              placeholder='Jane Doe'
              onChange={ ({ target }) => setField('name', target.value) }
              isInvalid={ !!errors.name }
            />
            <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={form.email}
              placeholder='abc@123.com'
              onChange={ ({ target }) => setField('email', target.value) }
              isInvalid={ !!errors.email }
            />
            <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              value={form.username}
              onChange={ ({ target }) => setField('username', target.value) }
              isInvalid={ !!errors.username }
            />
            <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
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
            { errors.roleName && <small style={{ color: '#dc3545'}}>{ errors.roleName }</small> }
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' onClick={ createUser }>Create User</Button>
        <Button variant='secondary' onClick={ cancelNewUser }>Cancel</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default NewUserForm
