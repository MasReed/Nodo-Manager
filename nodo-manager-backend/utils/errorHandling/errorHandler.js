// Central error handler
const errorHandler = (err, req, res, next) => {

  try {
    console.log('this is the error handling middlware')

    if (err.name === 'SomeError')
      return err = handleSomeError(err, res)

    res.status(err.status).send({ message: err.message })

  } catch (error) {
    res.status(500).send('An unknown error occured.')
  }
}

const handleSomeError = (err, res) => {

  const code = 418
  const errorMessage = 'This is some error'

  res.status(code).send({ message: errorMessage })
}

module.exports = {
  errorHandler
}
