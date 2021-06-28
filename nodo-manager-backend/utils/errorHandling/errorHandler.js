// Central error handler
const errorHandler = (err, req, res, next) => {

  try {

    console.log('')
    console.log('-----------------------------------')
    console.log('-------------  ERROR  -------------')
    console.log('-----------------------------------')
    console.log(err)
    console.log('___________________________________')

    if (err.name === 'ValidationError') {
      console.log('validation err')
    }

    res.status(err.status).send({ message: err.message })

  } catch (error) {
    res.status(500).send('An unknown error occured.')
  }
}

module.exports = {
  errorHandler
}
