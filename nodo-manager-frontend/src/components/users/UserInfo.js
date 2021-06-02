import React from 'react'
import { useDispatch } from 'react-redux'

import {
  updateUserActionCreator,
  deleteUserActionCreator
} from '../../reducers/userReducer'

const UserInfo = ({ user }) => {

  const dispatch = useDispatch()

  const userWithUpdates = {
    name: 'updatedName',
    username: 'updatedUsername',
    clearance: 'LICENSE TO CODE'
  }

  const updateUser = (id) => {
    dispatch(updateUserActionCreator(id, userWithUpdates))
  }

  const deleteUser = (id) => {
    dispatch(deleteUserActionCreator(id))
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <p>{user.clearance}</p>
      <button onClick={ () => deleteUser(user.id) }>DESTROY</button>
      <button onClick={ () => updateUser(user.id) }>UPDATE</button>
    </div>
  )
}



export default UserInfo
