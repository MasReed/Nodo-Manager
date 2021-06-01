import axios from 'axios'

const baseUrl = '/api/items'


// const getAll = async () => {
//   try {
//     const response = await axios.get(baseUrl)
//     return response.data
//   } catch (exception) {
//     console.log(exception)
//   }
// }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const exps = { getAll }

export default exps
