require('dotenv').config()

const PORT = process.env.PORT || 3000
const JWT_PHRASE = process.env.JWT_PHRASE
const MONGODB_URI_NODO = process.env.MONGODB_URI_NODO

module.exports = {
  PORT,
  JWT_PHRASE,
  MONGODB_URI_NODO
}
