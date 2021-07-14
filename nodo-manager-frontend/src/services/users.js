import axios from 'axios'

const baseUrl = '/api/users'

let token = null
const setToken = newToken => {
  token = `${newToken}`
}

//
const getAll = () => {
  try {
    const config = {
      headers: { 'x-access-token': token }
    }

    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)

  } catch (err) {
    if (err.response) {
      const userError = {
        type: 'Error Gathering Users',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw userError

    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

//
const create = async (newObject) => {
  try {
    const config = {
      headers: { 'x-access-token': token }
    }

    const response = await axios.post(`${baseUrl}/signup`, newObject, config)
    return response.data

  } catch (err) {
    if (err.response) {
      const userError = {
        type: 'Error Creating User',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw userError

    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

//
const update = async (id, updatedObject) => {
  try {
    const config = {
      headers: { 'x-access-token': token }
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
    return response.data

  } catch (err) {
    if (err.response) {
      const userError = {
        type: 'Error Updating User',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw userError

    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

//
const destroy = async (id) => {
  try {
    const config = {
      headers: { 'x-access-token': token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data

  } catch (err) {
    if (err.response) {
      const userError = {
        type: 'Error Removing User',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw userError

    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

const exps = { setToken, getAll, create, update, destroy }

export default exps
