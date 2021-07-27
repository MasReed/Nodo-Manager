// Custom item validation middleware used during item update requests, i.e.
// PUT requests. Built-in mongoose update validators have many caveats
// see: https://mongoosejs.com/docs/validation.html#:~:text=Update%20Validators%20Only%20Run%20On%20Updated%20Paths

const checkEmptyObject = (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw { status: 400, message: 'Updated object is empty.'}
    }

    return next()

  } catch (err) {
    next(err)
  }
}

const checkRequiredPropertiesDefined = (req, res, next) => {
  try {
    // These match menuItemSchema 'required' properties, see models/menuItems
    const requiredPropertiesAndErrorMessage = {
      name: 'An item name is required.',
      category: 'Item must have a category.',
      price: 'Item must have a price.'
    }

    for (const property in requiredPropertiesAndErrorMessage) {
      if (!req.body[property] || req.body[property] === '') {
        throw {
          status: 400,
          message: requiredPropertiesAndErrorMessage[property]
        }
      }
    }

    return next()

  } catch (err) {
    next(err)
  }
}

const checkOptionalPropertiesDefinedDefault = (req, res, next) => {
  try {
    const optionalPropertiesAndDefaults = {
      description: '',
      ingredients: [],
      availability: 'Unavailable'
    }

    for (const property in optionalPropertiesAndDefaults) {
      if (!req.body[property]) {
        req.body[property] = optionalPropertiesAndDefaults[property]
      }
    }

    return next()

  } catch (err) {
    next(err)
  }
}

const checkPositiveItemPrice = (req, res, next) => {
  try {
    if (req.body.price < 0) {
      req.body.price = Math.abs(req.body.price)
    }

    return next()

  } catch (err) {
    next(err)
  }
}

const verifyItem = {
  checkEmptyObject,
  checkRequiredPropertiesDefined,
  checkOptionalPropertiesDefinedDefault,
  checkPositiveItemPrice
}

module.exports = verifyItem
