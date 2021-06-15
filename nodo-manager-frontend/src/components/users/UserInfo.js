import React from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>{user.username}</h2>
          <p>{user.clearance}</p>
        </div>
        <div>
          <Button
            onClick={ () => updateUser(user.id) }
            size='sm'
            variant='outline-secondary'
          >
            UPDATE
          </Button>
          <Button
            onClick={ () => deleteUser(user.id) }
            size='sm'
            variant='outline-secondary'
          >
            DELETE
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
