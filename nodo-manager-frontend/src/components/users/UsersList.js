import React from 'react'
import { useSelector } from 'react-redux'

import UserInfo from './UserInfo'

const UsersList = () => {

  const users = useSelector(state => state.users)

  //
  const sortByRole = (usersArray) => {

    const sortBy = ['admin', 'manager', 'employee', 'user', 'guest']

    const copyArray = [...usersArray]
    //.slice() doesn't make deep copy needed for .role.name, must create our own

    return copyArray.sort((a, b) => (
      sortBy.indexOf(a.role.name) - sortBy.indexOf(b.role.name)
    ))
  }

  const sortedUsers = sortByRole(users)

  return (
    <div>
      {users && sortedUsers.map(user => <UserInfo key={user.id} user={user} />)}
    </div>
  )
}

export default UsersList
