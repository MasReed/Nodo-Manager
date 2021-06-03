const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const rolesInitializer = require('./utils/rolesInitializer')
const middleware = require('./utils/middleware')
const itemsRouter = require('./controllers/items')
const ordersRouter = require('./controllers/orders')
const usersRouter = require('./controllers/users')

// DB connection
mongoose.connect(config.MONGODB_URI_NODO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => {
  console.log('connected to MongoDB')
  rolesInitializer()
})
.catch((error) => {
  console.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

// Abstracted Controllers
app.use('/api/items', itemsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/users', usersRouter)


// Misc. Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api', (req, res) => {
  res.send('API')
})

// Server Connection
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
