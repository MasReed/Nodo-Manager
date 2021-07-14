import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'

import UpdateUserForm from './UpdateUserForm'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { deleteUserActionCreator} from '../../reducers/userReducer'

const UserInfo = ({ user }) => {

  const dispatch = useDispatch()

  const [showUpdateModal, setShowUpdateModal] = useState(false)

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
            onClick={ () => setShowUpdateModal(true) }
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

      <UpdateUserForm
        user={user}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
      />
    </div>
  )
}

export default UserInfo
