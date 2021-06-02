import React from 'react'
import { useDispatch } from 'react-redux'

import { addUserActionCreator } from '../../reducers/userReducer'
import UsersList from './UsersList'

const UsersPage = () => {

  const dispatch = useDispatch()

  // User action dispatchers
  const addUser = (event) => {
    event.preventDefault()
    dispatch(addUserActionCreator({
      name: 'newName',
      username: 'newUser',
      clearance: 'peon'
    }))
  }

  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Users Page</h2>
      <button onClick={ addUser }>ADD USER</button>
      <hr />
      <UsersList />
    </div>
  )
}

export default UsersPage
