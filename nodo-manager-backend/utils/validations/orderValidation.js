const config = require('../config')

//
const verifyStatus = (req, res, next) => {
  try {
    const statusOptions = ['In Progress', 'Complete', 'Canceled']

    if (!req.body.status || req.body.status === '') {
      req.body.status = 'In Progress'
    } else if (!statusOptions.includes(req.body.status)) {
      req.body.status = 'In Progress'
    }

    return next()

  } catch (err) {
    next(err)
  }
}

//
const verifyCategory = (req, res, next) => {
  try {
    if (!req.body.category || req.body.category === '') {
      req.body.category = 'Other'
    }

    return next()

  } catch (err) {
    next(err)
  }
}

//
const verifyName = (req, res, next) => {
  try {
    if (!req.body.name || req.body.name === '') {
      throw ({ status: 400, message: 'An order name is required.' })
    }

    return next()

  } catch (err) {
    next(err)
  }
}

//
const verifyItems = (req, res, next) => {
  try {
    if (!req.body.items || req.body.items.length === 0) {
      throw ({ status: 400, message: 'No items in order!' })
    }
    
    return next()

  } catch (err) {
    next(err)
  }
}

//
const verifyNotes = (req, res, next) => {
  try {
    if (!req.body.notes) {
      req.body.notes = ''
    }

    if (req.body.notes.length > 250) {
      throw ({ status: 400, message: 'Notes are too long.' })
    }

    return next()

  } catch (err) {
    next(err)
  }
}

// cost-related calculations: subtotal, taxrate, taxamount, total
const verifyCosts = (req, res, next) => {
  try {

    /* the subtotal should be calculated by matching baseItemId to those stored
    in the database and getting the total from there; need to implement
    modIngredient Costs alongside it if so (requires schema change) */
    const subTotal = req.body.items.map(item =>
      item.basePrice).reduce((sum, val) => sum + val)

    const taxAmount = Math.round(
      (subTotal * config.TAX_RATE) * 100
    ) / 100 // Round to hundredths

    const total = Math.round(
      (subTotal + taxAmount) * 100
    ) / 100 // Round to hundredths

    if (req.body.costs.subTotal !== subTotal) {
      req.body.costs.subTotal = subTotal
    }

    if (req.body.costs.taxAmount !== taxAmount) {
      req.body.costs.taxAmount = taxAmount
    }

    if (req.body.costs.total !== total) {
      req.body.costs.total = total
    }

    return next()

  } catch (err) {
    next(err)
  }
}

const verifyOrderData = {
  verifyStatus,
  verifyCategory,
  verifyName,
  verifyItems,
  verifyNotes,
  verifyCosts
}

module.exports = verifyOrderData
