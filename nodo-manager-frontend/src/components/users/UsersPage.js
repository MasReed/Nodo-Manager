import React from 'react'

import NewUserForm from './NewUserForm'
import UsersList from './UsersList'

const UsersPage = () => {

  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Users Page</h2>
      <NewUserForm />
      <hr />
      <UsersList />
    </div>
  )
}

export default UsersPage
