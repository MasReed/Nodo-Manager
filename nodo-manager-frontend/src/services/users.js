import axios from 'axios'

const baseUrl = '/api/users'

let token = null
const setToken = newToken => {
  token = `${newToken}`
}


const getAll = () => {
  const config = {
    headers: { 'x-access-token': token }
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  // try {
    const response = await axios.post(`${baseUrl}/signup`, newObject)
    return response.data

  // } catch (err) {
  //   if (err.response) {
  //     console.log(err.response.data.message)
  //   } else if (err.request) {
  //     console.log('err.req', err.request)
  //   } else {
  //     console.log(err)
  //   }
  // }
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const destroy = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const exps = { setToken, getAll, getOne, create, update, destroy }

export default exps
