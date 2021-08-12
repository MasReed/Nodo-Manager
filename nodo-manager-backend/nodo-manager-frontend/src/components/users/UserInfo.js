import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'

import UpdateUserForm from './UpdateUserForm'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { isVisible } from '../../reducers/modalReducer'
import { deleteUserActionCreator } from '../../reducers/userReducer'

const UserInfo = ({ user }) => {
  const dispatch = useDispatch()

  const [showUpdateModal, setShowUpdateModal] = useState(false)

  //
  const deleteUser = async (id) => {
    try {
      await dispatch(deleteUserActionCreator(id))
    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  //
  const updateUser = async () => {
    setShowUpdateModal(true)
    await dispatch(isVisible(true))
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <div>
          <h2>{user.username}</h2>
          <p>{user.role && user.role.name}</p>
        </div>

        <div>
          <Button
            onClick={updateUser}
            size='sm'
            variant='outline-secondary'
          >
            UPDATE
          </Button>
          <Button
            onClick={() => deleteUser(user.id)}
            size='sm'
            variant='outline-secondary'
          >
            DELETE
          </Button>
        </div>
      </div>

      {/* Modal Component */}
      <UpdateUserForm
        user={user}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
      />
    </div>
  )
}

export default UserInfo
