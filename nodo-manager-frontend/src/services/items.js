import axios from 'axios'

const baseUrl = '/api/items'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const exps = { getAll }

export default exps
