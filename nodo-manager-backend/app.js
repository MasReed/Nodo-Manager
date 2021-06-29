const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const errorHandler = require('./utils/errorHandling/errorHandler')
const rolesInitializer = require('./utils/rolesInitializer')
const middleware = require('./utils/middleware')
const authenticationsRouter = require('./controllers/authentications')
const authorizationsRouter = require('./controllers/authorizations')
const itemsRouter = require('./controllers/items')
const ordersRouter = require('./controllers/orders')
const usersRouter = require('./controllers/users')

// DB connection
mongoose.connect(config.MONGODB_URI_NODO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then( async () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('connected to MongoDB')
    await rolesInitializer()
  }
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
app.use('/api/authenticate', authenticationsRouter)
app.use('/api/authorize', authorizationsRouter)

// Centralized error handler
app.use(errorHandler.errorHandler)

module.exports = app