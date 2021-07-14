import axios from 'axios'

const baseUrl = '/api/authenticate'

// Log user in and get token
const login = async (username, password) => {

  try {
    const response = await axios.post(`${baseUrl}/signin`, {
      username,
      password
    })

    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data

  } catch (err) {
    if (err.response) {
      const loginError = {
        type: 'Login Error',
        message: err.response.data.message,
        variant: 'warning',
        show: true
      }
      throw loginError
      
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

// remove user from local storage
const logout = async () => {
  await localStorage.removeItem('user')
}

const exps = { login, logout }

export default exps
