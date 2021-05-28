const express = require('express')
const app = express()

const middleware = require('./utils/middleware')

const PORT = 3000

app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api', (req, res) => {
  res.send('API')
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
