// Central error handler
const errorHandler = (err, req, res, next) => {

  try {
    res.status(err.status).send({ message: err.message })

  } catch (error) {
    res.status(500).send('An unknown error occured.')
  }
}

module.exports = {
  errorHandler
}
