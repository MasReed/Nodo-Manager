
const checkEmptyDeleteId = (req, res, next) => {
  try {
    console.log('req params:::::::::::::::::::::::::::', req.params.id)
    console.log('req', req)
    console.log('req url', req.url)

    if (!req.url) {
      throw { status: 400, message: 'No user id defined.'}
    }
    next()

  } catch (err) {
    next(err)
  }
}

const verifyUser = {
  checkEmptyDeleteId
}

module.exports = verifyUser
