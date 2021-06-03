import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUserActionCreator } from '../../reducers/userReducer'

const NewUserForm = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [clearance, setClearance] = useState('')
  // const [credentials, setCredentials] = useState('')

  const createUser = (event) => {
    event.preventDefault()


    const newUserObject = {
      name: name,
      username: username,
      clearance: clearance
    }

    dispatch(addUserActionCreator(newUserObject))

    setName('')
    setUsername('')
    setClearance('')
  }


  return (
    <div>
      <h4>New User</h4>
      <form onSubmit={ createUser } style={{ margin: '2% 0' }}>
        <label>Name:</label>
        <input
          value={name}
          onChange={ ({ target }) => setName(target.value) }
        />

        <label>Username:</label>
        <input
          value={username}
          onChange={ ({ target }) => setUsername(target.value) }
        />

        <label>Clearance:</label>
        <input
          value={clearance}
          onChange={ ({ target }) => setClearance(target.value) }
        />

        <button type='submit'>Create User</button>
      </form>
    </div>
  )
}

export default NewUserForm
