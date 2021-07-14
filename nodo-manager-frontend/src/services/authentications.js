import axios from 'axios'

const baseUrl = '/api/authenticate'

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
const logout = async () => {
  await localStorage.removeItem('user')
}

const exps = { login, logout }

export default exps
