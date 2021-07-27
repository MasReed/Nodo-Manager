import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import UserInfo from './UserInfo'

const UsersList = () => {
  const users = useSelector((state) => state.users)

  const [sortedUsers, setSortedUsers] = useState(users)

  //
  const sortByRole = (usersArray) => {
    const sortBy = ['admin', 'manager', 'employee', 'user', 'guest']

    const usersCopy = [...usersArray]
    // .slice() doesn't make deep copy needed for .role.name, must create our own

    return usersCopy.sort((a, b) => (
      sortBy.indexOf(a.role.name) - sortBy.indexOf(b.role.name)
    ))
  }

  //
  useEffect(() => {
    const roleSortedUsers = sortByRole(users)

    setSortedUsers(roleSortedUsers)
  }, [users])

  return (
    <div>
      {users && sortedUsers.map((user) => <UserInfo key={user.id} user={user} />)}
    </div>
  )
}

export default UsersList
