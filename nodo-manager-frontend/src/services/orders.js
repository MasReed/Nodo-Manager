import axios from 'axios'

const baseUrl = '/api/orders'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
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

const exps = { getAll, getOne, create, update, destroy }

export default exps
