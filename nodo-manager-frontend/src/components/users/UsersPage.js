import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import NewUserForm from './NewUserForm'
import UsersList from './UsersList'

const UsersPage = () => {

  const [show, setShow] = useState(false)

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
