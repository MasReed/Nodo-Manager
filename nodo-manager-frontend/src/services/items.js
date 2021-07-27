import axios from 'axios'

const baseUrl = '/api/items'

let token = null
const setToken = (newToken) => {
  token = `${newToken}`
}

//
const getAll = () => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    }

    const request = axios.get(baseUrl, config)
    return request.then((response) => response.data)
  } catch (err) {
    if (err.response) {
      const itemError = {
        type: 'Error Gathering Items',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw itemError
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
  return false
}

//
const create = async (newObject) => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (err) {
    if (err.response) {
      const itemError = {
        type: 'Error Creating Menu Item',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw itemError
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
  return false
}

//
const update = async (id, updatedObject) => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
    return response.data
  } catch (err) {
    if (err.response) {
      const itemError = {
        type: 'Error Updating Menu Item',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw itemError
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
  return false
}

//
const destroy = async (id) => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (err) {
    if (err.response) {
      const itemError = {
        type: 'Error Deleting Menu Item',
        message: err.response.data.message,
        variant: 'warning',
      }
      throw itemError
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
  return false
}

const exps = {
  setToken, getAll, create, update, destroy,
}

export default exps
