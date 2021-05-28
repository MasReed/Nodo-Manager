const requestLogger = (request, response, next) => {
  console.log('-----------------------------------')
  console.log('----------  NEW REQUEST  ----------')
  console.log('-----------------------------------')
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('_________________________')
  next()
}

module.exports = {
  requestLogger
}
