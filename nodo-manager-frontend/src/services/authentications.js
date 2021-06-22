import axios from 'axios'

const baseUrl = '/api/authenticate'


// Register new user --> done in userService
// const register = async (name, email, username, password, roles) => {
//
//   const newUserObject = {
//     name,
//     email,
//     username,
//     password,
//     roles
//   }
//
//   const response = await axios.post(`${baseUrl}/signup`, newUserObject)
//   return response.data
// }

// Log user in and get token
const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}/signin`, {
    username,
    password
  })

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// remove user from local storage
const logout = () => {
  localStorage.removeItem('user')
}

const exps = { login, logout }

export default exps
