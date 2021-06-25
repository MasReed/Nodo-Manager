// Central error handler
const errorHandler = (err, req, res, next) => {

  console.log('')
  console.log('-----------------------------------')
  console.log('-------------  ERROR  -------------')
  console.log('-----------------------------------')
  console.log(err)
  console.log('___________________________________')


  try {
    res.status(err.status).send({ message: err.message })

  } catch (error) {
    res.status(500).send('An unknown error occured.')
  }
}

module.exports = {
  errorHandler
}
