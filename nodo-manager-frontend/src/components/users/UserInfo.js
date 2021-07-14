import React from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'

import { toastAlertCreator } from '../../reducers/alertReducer'
import {
  updateUserActionCreator,
  deleteUserActionCreator
} from '../../reducers/userReducer'

const UserInfo = ({ user }) => {

  const dispatch = useDispatch()

  const userWithUpdates = {
    name: 'updatedName',
    username: 'updatedUsername',
    role: {
      name: 'user'
    }
  }

  const updateUser = async (id) => {
    try {
      dispatch(updateUserActionCreator(id, userWithUpdates))
    } catch (err) {
      dispatch(toastAlertCreator(err))
    }
  }

  const deleteUser = (id) => {
    try {
      dispatch(deleteUserActionCreator(id))
    } catch (err) {
      dispatch(toastAlertCreator(err))
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>{user.username}</h2>
          <p>{user.role && user.role.name}</p>
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
