import axios from 'axios'

const baseUrl = '/api/items'

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

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const destroy = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const exps = { setToken, getAll, create, update, destroy }

export default exps
