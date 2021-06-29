require('dotenv').config()

const PORT = process.env.PORT
const JWT_PHRASE = process.env.JWT_PHRASE
const MONGODB_URI_NODO = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI_NODO
  : process.env.MONGODB_URI_NODO

const TAX_RATE = process.env.TAX_RATE

module.exports = {
  PORT,
  JWT_PHRASE,
  MONGODB_URI_NODO,
  TAX_RATE
}
