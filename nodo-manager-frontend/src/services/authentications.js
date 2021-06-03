import axios from 'axios'

const baseUrl = '/api/auth'


// Register new user
const register = async (username, email, password) => {

  const newUserObject = {
    username,
    email,
    password
  }

  const response = await axios.post(`${baseUrl}/signup`, newUserObject)
  return response.data
}

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

// remove use from local storage
const logout = () => {
  localStorage.removeItem('user')
}

const exps = { register, login, logout }

export default exps
