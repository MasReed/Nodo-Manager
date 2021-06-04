import React from 'react'
import { useSelector } from 'react-redux'

import UserInfo from './UserInfo'

const UsersList = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      {users && users.map(user => <UserInfo key={user.id} user={user} />)}
    </div>
  )
}

export default UsersList
