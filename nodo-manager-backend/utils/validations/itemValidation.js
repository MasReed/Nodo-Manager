// Custom item validation middleware used during item update requests, i.e.
// PUT requests. Built-in mongoose update validators have many caveats
// see: https://mongoosejs.com/docs/validation.html#:~:text=Update%20Validators%20Only%20Run%20On%20Updated%20Paths

const checkEmptyObject = (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw { status: 400, message: 'Updated object is empty.'}
    }
    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const checkRequiredPropertiesAreDefined = async (req, res, next) => {
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

    next()

  } catch (err) {
    console.log(err)
    next(err)
  }
}


const verifyItem = {
  checkEmptyObject,
  checkRequiredPropertiesAreDefined
}

module.exports = verifyItem
