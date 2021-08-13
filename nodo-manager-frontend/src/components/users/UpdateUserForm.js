import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'
import useForm from '../../hooks/useForm'
import { userForms } from '../../configurations/formConfigs'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { isVisible } from '../../reducers/modalReducer'
import { updateUserActionCreator } from '../../reducers/userReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const UpdateUserForm = ({ userId, show, setShow }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users
    .find((userObject) => userObject.id === userId))

  const [form, setForm, errors, isValidated, resetForm] = useForm({
    usersName: user.name,
    email: user.email,
    username: user.username,
    roleName: user.role.name,
  })

  //
  const resetComponent = async (formReset = true) => {
    if (formReset) {
      resetForm()
    }

    await dispatch(isVisible(false))
    setShow(false)
  }

  //
  const updateUser = async (event) => {
    event.preventDefault()

    if (isValidated()) {
      try {
        const updatedUserObject = {
          ...user,
          name: form.usersName,
          email: form.email,
          username: form.username,
          password: null,
          role: {
            name: form.roleName,
          },
        }

        await dispatch(updateUserActionCreator(user.id, updatedUserObject))

        setForm({
          usersName: form.usersName,
          email: form.email,
          username: form.username,
          roleName: form.roleName,
        })

        resetComponent(false) // reset all but form
      } catch (err) {
        dispatch(toastAlertCreator(err))
      }
    }
  }

  return (
    <Modal
      show={show}
      onHide={resetComponent}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {`Update ${user.username}`}
        </Modal.Title>
      </Modal.Header>

      <AlertBanner />

      <Modal.Body>
        <Form id='newUserForm'>
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type='text'
              value={form.usersName}
              maxLength={userForms.usersName.maxLength.value.toString()}
              placeholder='Jane Doe'
              onChange={({ target }) => setForm('usersName', target.value)}
              isInvalid={!!errors.usersName}
            />
            <Form.Text>
              {charactersRemaining(
                form.usersName, userForms.usersName.maxLength.value,
              )}
            </Form.Text>

            <Form.Control.Feedback type='invalid'>
              { errors.usersName }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={form.email.trimStart()}
              minLength={userForms.email.minLength.value.toString()}
              maxLength={userForms.email.maxLength.value.toString()}
              placeholder='abc@123.com'
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

          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              value={form.username.trimStart()}
              minLength={userForms.username.minLength.value.toString()}
              maxLength={userForms.username.maxLength.value.toString()}
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
                onChange={({ target }) => setForm('roleName', target.value)}
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
                onChange={({ target }) => setForm('roleName', target.value)}
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
                onChange={({ target }) => setForm('roleName', target.value)}
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
                onChange={({ target }) => setForm('roleName', target.value)}
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
        <Button variant='secondary' onClick={resetComponent}>Cancel</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default UpdateUserForm
