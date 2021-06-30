const mongoose = require('mongoose')

// Central error handler
const errorHandler = (err, req, res, next) => {

  try {

    if (process.env.NODE_ENV === 'development') {
      console.log('')
      console.log('-----------------------------------')
      console.log('-------------  ERROR  -------------')
      console.log('-----------------------------------')
      console.log(err)
      console.log('___________________________________')
    }

    if (err.name === 'CastError') {
      res.status(500).send({ message: err.reason })
    }

    res.status(err.status).send({ message: err.message })

  } catch (error) {
    res.status(500).send('An unknown error occured.')
  }
}

module.exports = {
  errorHandler
}
