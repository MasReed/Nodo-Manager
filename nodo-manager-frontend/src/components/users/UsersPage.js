import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'

import NewUserForm from './NewUserForm'
import UsersList from './UsersList'

const UsersPage = () => {

  const [show, setShow] = useState(false)

  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Users Page</h2>

      <Button onClick={ () => setShow(true) } variant='secondary'>New User</Button>

      <NewUserForm show={show} setShow={setShow}/>
      <hr />
      <UsersList />
    </div>
  )
}

export default UsersPage
