import axios from 'axios'

const baseUrl = '/api/items'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const exps = { getAll, create }

export default exps
