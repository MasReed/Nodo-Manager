import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import NewUserForm from './NewUserForm'
import UsersList from './UsersList'

import { initializeUsers } from '../../reducers/userReducer'

const UsersPage = () => {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container className='pt-5'>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <h1 className='m-0'>Users Page</h1>
        <Button onClick={ () => setShow(true) } variant='outline-secondary'>
          NEW USER
        </Button>
      </div>

      <NewUserForm show={show} setShow={setShow}/>
      <hr />
      <UsersList />
    </Container>
  )
}

export default UsersPage
