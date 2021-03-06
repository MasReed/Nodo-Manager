import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import NewUserForm from './NewUserForm'
import UsersList from './UsersList'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { isVisible } from '../../reducers/modalReducer'
import { initializeUsers } from '../../reducers/userReducer'

const UsersPage = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const init = async () => {
      await dispatch(initializeUsers())
    }
    const onErr = async (err) => {
      await dispatch(toastAlertCreator(err))
    }

    try {
      init()
    } catch (err) {
      onErr(err)
    }
  })

  //
  const handleNewUserClick = async () => {
    setShow(true)
    await dispatch(isVisible(true))
  }

  return (
    <Container className='pt-5'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>Users Page</h1>
        <Button onClick={handleNewUserClick} variant='outline-secondary'>
          NEW USER
        </Button>
      </div>

      <NewUserForm show={show} setShow={setShow} />
      <hr />
      <UsersList />
    </Container>
  )
}

export default UsersPage
