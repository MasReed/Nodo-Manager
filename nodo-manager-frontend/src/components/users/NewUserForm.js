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
  const [roles, setRoles] = useState([])

  const createUser = (event) => {
    event.preventDefault()

    //convert comma-separated items into array if neccessary
    const rolesArray = Array.isArray(roles)
      ? roles
      : roles.split(/\s*(?:,|$)\s*/)

    const newUserObject = {
      name: name,
      email: email,
      username: username,
      password: 1234,
      roles: rolesArray
    }

    dispatch(addUserActionCreator(newUserObject))

    setName('')
    setEmail('')
    setUsername('')
    setRoles('')
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
            <Form.Label>Roles:</Form.Label>
            <Form.Control
              value={roles}
              onChange={ ({ target }) => setRoles(target.value) }
            />
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
