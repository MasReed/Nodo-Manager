// Logs api requests to the console.
const requestLogger = (request, response, next) => {
  if (process.env.DEBUG_MODE || process.env.NODE_ENV === 'development') {
    console.log('-----------------------------------')
    console.log('----------  NEW REQUEST  ----------')
    console.log('-----------------------------------')
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
  }

  return next()
}

module.exports = {
  requestLogger
}
