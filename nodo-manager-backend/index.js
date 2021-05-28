require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const PORT = 3000

app.use(express.json())
app.use(middleware.requestLogger)


// DB connection
mongoose.connect(process.env.MONGODB_URI_NODO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected to MongoDB Atlas')
})




const fakeItem = {
  name: 'Hamburger',
  description: 'A plain old hamburger, delicous.',
  ingredients: ['Bun', 'Patty', 'Lettuce', 'Tomato', 'Pickle', 'Ketchup']
}

const items = [
  fakeItem,
  fakeItem
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api', (req, res) => {
  res.send('API')
})

app.get('/api/items/', (req, res) => {
  res.json(items)
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
