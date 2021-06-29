const http = require('http')
const app = require('./app')
const config = require('./utils/config')

// Create server instance of app
const server = http.createServer(app)

// Start the app
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
