require('dotenv').config()
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const itemsRouter = require('./controllers/items')
const mongoose = require('mongoose')

const PORT = 3000

// DB connection
mongoose.connect(process.env.MONGODB_URI_NODO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.error('error connection to MongoDB:', error.message)
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

// Abstracted Controllers
app.use('/api/items', itemsRouter)


// Misc. Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api', (req, res) => {
  res.send('API')
})

// Server Connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
