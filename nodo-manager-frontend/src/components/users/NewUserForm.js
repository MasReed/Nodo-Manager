import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { addUserActionCreator } from '../../reducers/userReducer'

const NewUserForm = ({ show, setShow }) => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [roleName, setRoleName] = useState('user')

  const createUser = (event) => {
    event.preventDefault()

    const newUserObject = {
      name: name,
      email: email,
      username: username,
      password: 'password',
      role: {
        name: roleName
      }
    }

    dispatch(addUserActionCreator(newUserObject))

    setName('')
    setEmail('')
    setUsername('')
    setRoleName('user')
    setShow(false)
  }

  return (
    <Modal
      show={show}
      onHide={ () => setShow(false) }
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add A New User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='newUserForm' onSubmit={ createUser }>
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              value={name}
              onChange={ ({ target }) => setName(target.value) }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              value={email}
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              value={username}
              onChange={ ({ target }) => setUsername(target.value) }
            />
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
                checked={roleName === 'admin'}
                value='admin'
                onChange={ ({ target }) => setRoleName(target.value) }
              />
              <Form.Check
                inline
                label='Manager'
                name='roles'
                type='radio'
                id='inline-radio-manager'
                checked={roleName === 'manager'}
                value='manager'
                onChange={ ({ target }) => setRoleName(target.value) }
              />
              <Form.Check
                inline
                label='Employee'
                name='roles'
                type='radio'
                id='inline-radio-employee'
                checked={roleName === 'employee'}
                value='employee'
                onChange={ ({ target }) => setRoleName(target.value) }
              />
              <Form.Check
                inline
                label='User'
                name='roles'
                type='radio'
                id='inline-radio-user'
                checked={roleName === 'user'}
                value='user'
                onChange={ ({ target }) => setRoleName(target.value) }
              />
            </div>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' form='newUserForm'>Create User</Button>
        <Button variant="secondary" onClick={ () => setShow(false) }>
          Cancel
        </Button>
      </Modal.Footer>

    </Modal>
  )
}

export default NewUserForm
