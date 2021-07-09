const config = require('../config')

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

// Verify order cost calculations
const verifyCosts = (req, res, next) => {
  try {
    if (!req.body.items || req.body.items.length === 0) {
      throw ({ status: 400, message: 'No items in order!' })
    }

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

    if (req.body.subTotal !== subTotal) {
      console.log('Subtotals do not match')
      console.log('Request subTotal: ', req.body.subtotal)
      console.log('Calculated subTotal: ', subTotal)
      req.body.subTotal = subTotal
      console.log('Updated order subTotal', req.body.subtotal)
    }

    if (req.body.taxAmount !== taxAmount) {
      console.log('Tax Amounts do not match')
      console.log('Req taxRate and Amount', req.body.taxRate, req.body.taxAmount)
      console.log('Calc taxRate and Amount', Number(config.TAX_RATE), taxAmount)
      req.body.taxAmount = taxAmount
      console.log('Updated order tax amount', req.body.taxAmount)

    }

    if (req.body.total !== total) {
      console.log('Total amounts do not match')
      console.log('Req total', req.body.total)
      console.log('Calc total', total)
      req.body.total = total
      console.log('Updated order total', req.body.total)
    }

    return next()

  } catch (err) {
    next(err)
  }
}

const verifyOrderData = {
  verifyStatus,
  verifyCosts
}

module.exports = verifyOrderData
