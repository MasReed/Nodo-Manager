import axios from 'axios'

const baseUrl = '/api/items'

let token = null
const setToken = newToken => {
  token = `${newToken}`
}

//
const getAll = () => {
  const config = {
    headers: { 'x-access-token': token }
  }

  try {
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
  } catch (err) {
    if (err.response) {
      console.log('err.res', err.response.data.message)
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

//
const create = async (newObject) => {
  const config = {
    headers: { 'x-access-token': token }
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (err) {
    if (err.response) {
      console.log('err.res', err.response.data.message)
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

//
const update = async (id, updatedObject) => {
  const config = {
    headers: { 'x-access-token': token }
  }

  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
    return response.data
  } catch (err) {
    if (err.response) {
      console.log('err.res', err.response.data.message)
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

//
const destroy = async (id) => {
  const config = {
    headers: { 'x-access-token': token }
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (err) {
    if (err.response) {
      console.log('err.res', err.response.data.message)
    } else if (err.request) {
      console.log('err.req', err.request)
    } else {
      console.log(err)
    }
  }
}

const exps = { setToken, getAll, create, update, destroy }

export default exps
