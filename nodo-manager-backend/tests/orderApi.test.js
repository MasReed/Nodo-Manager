const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Item = require('../models/menuItem')
const Role = require('../models/role')
const Order = require('../models/order')
const User = require('../models/user')
const config = require('../utils/config')
const rolesInitializer = require('../utils/rolesInitializer')

const api = supertest(app)

let adminToken
let managerToken
let employeeToken
let userToken
let guestToken

let validOrder

// Initialize roles and users in database
beforeAll(async () => {
  // Roles
  await rolesInitializer()

  // Users
  await User.deleteMany({})
  // admin
  const newAdmin = new User({
    email: 'new@admin',
    username: 'TestAdmin',
    role: await Role.findOne({ name: 'admin' })
  })
  await newAdmin.save()
  adminToken = jwt.sign({ id: newAdmin.id }, config.JWT_PHRASE)

  // manager
  const newManager = new User({
    email: 'new@manager',
    username: 'TestManager',
    role: await Role.findOne({ name: 'manager' })
  })
  await newManager.save()
  managerToken = jwt.sign({ id: newManager.id }, config.JWT_PHRASE)

  // employee
  const newEmployee = new User({
    email: 'new@employee',
    username: 'TestEmployee',
    role: await Role.findOne({ name: 'employee' })
  })
  await newEmployee.save()
  employeeToken = jwt.sign({ id: newEmployee.id }, config.JWT_PHRASE)

  // user
  const newUser = new User({
    email: 'new@user',
    username: 'TestUser',
    role: await Role.findOne({ name: 'user' })
  })
  await newUser.save()
  userToken = jwt.sign({ id: newUser.id }, config.JWT_PHRASE)

  // guest
  const newGuest = new User({
    email: 'new@guest',
    username: 'TestGuest',
    role: await Role.findOne({ name: 'guest' })
  })
  await newGuest.save()
  guestToken = jwt.sign({ id: newGuest.id }, config.JWT_PHRASE)

  // Items
  await Item.deleteMany({})

  const item1 = new Item({
    name: 'Test Item 1',
    description: 'A simple food item for testing orders.',
    ingredients: ['A', 'B', 'C', 'D', 'E', 'F'],
    category: 'Test Foods',
    price: 1.99,
    availability: 'Available'
  })
  await item1.save()

  const item2 = new Item({
    name: 'Test Item 2',
    description: 'Another simple food item for testing orders.',
    ingredients: ['F', 'E', 'D', 'C', 'B', 'A'],
    category: 'Test Foods',
    price: 4.99,
    availability: 'Available'
  })
  await item2.save()

  const items = await Item.find({})
  validOrder = {
    status: 'In progress',
    category: 'Carry Out',
    name: 'Test Order',
    items: [
      {...items[0], basePrice: 1.99}, // Shortcut of proper format until
      {...items[1], basePrice: 4.99} // moded object in order is uniform
    ],
    notes: 'This is a test.',
    costs: {
      subTotal: 6.98,
      taxRate: 0.07,
      taxAmount: 0.49,
      total: 7.47
    }
  }
})

// Reset collections before each test
beforeEach(async () => {
  await Order.deleteMany({})
})

//
describe('Order API Tests', () => {
  //
  describe('Test Database Initializations', () => {
    //
    test('roles are initialized', async () => {
      const roles = await Role.find({}).exec()
      expect(roles).toHaveLength(5)
    })

    //
    test('users are initialized', async () => {
      const users = await User.find({}).exec()
      expect(users).toHaveLength(5)
    })

    //
    test('items are initialized', async () => {
      const items = await Item.find({}).exec()
      expect(items).toHaveLength(2)
    })
  })

  //
  describe('User CRUD Operations', () => {
    //
    describe('POST Requests', () => {
      //
      describe('Data Validations', () => {
        //
        test('Status 200 given proper format', async () => {
          const postingUser = await User.findOne({ username: 'TestAdmin' })
          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)
            .expect('Content-Type', /application\/json/)

          expect(res.body.user).toBe(postingUser.id)
        })

        //
        describe('Mongoose Timestamp Properties', () => {
          //
          test('has createdAt, updatedAt properties', async () => {

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrder)
              .expect(200)

            expect(res.body.createdAt).toBeDefined()
            expect(res.body.updatedAt).toBeDefined()
          })

          //
          test('updatedAt and createdAt timestamps are the same', async () => {
            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrder)
              .expect(200)

            const nowTime = new Date().getTime()
            const createdTime = new Date(res.body.createdAt).getTime()
            const updatedTime = new Date(res.body.updatedAt).getTime()
            const deltaT = Math.abs( createdTime - nowTime )

            expect(createdTime).toBe(updatedTime)
            expect(deltaT < 300).toBe(true) // Updated in the last 300 sec
          })
        })

        //
        describe('Status Property', () => {
          //
          test('Undefined order status defaults to "In Progress"', async () => {
            const validOrderUndefinedStatus = {
              ...validOrder,
              status: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderUndefinedStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })

          //
          test('Empty order status defaults to "In Progress"', async () => {
            const validOrderWithEmptyStatus = {
              ...validOrder,
              status: ''
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })

          //
          test('Invalid order status defaults to "In Progress"', async () => {
            const validOrderWithInvalidStatus = {
              ...validOrder,
              status: 'INVALID STATUS'
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })
        })

        //
        describe('Category Property', () => {
          //
          test('Undefined order category defaults to "Other"', async () => {
            const validOrderWithUndefinedCategory = {
              ...validOrder,
              category: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedCategory)
              .expect(200)

            expect(res.body.category).toBe('Other')
          })

          //
          test('Empty order category defaults to "Other"', async () => {
            const validOrderWithEmptyCategory = {
              ...validOrder,
              category: ''
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyCategory)
              .expect(200)

            expect(res.body.category).toBe('Other')
          })
        })

        //
        describe('Name Property', () => {
          //
          test('Status 400 for undefined order name', async () => {
            const validOrderWithUndefinedName = {
              ...validOrder,
              name: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedName)
              .expect(400)

            expect(res.body.message).toBe('An order name is required.')
          })

          //
          test('Status 400 for empty order name', async () => {
            const validOrderWithEmptyName = {
              ...validOrder,
              name: ''
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyName)
              .expect(400)

            expect(res.body.message).toBe('An order name is required.')
          })
        })

        //
        describe('Items Property', () => {
          //
          test('Status 400 for undefined order items', async () => {
            const validOrderWithUndefinedItems = {
              ...validOrder,
              items: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedItems)
              .expect(400)

            expect(res.body.message).toBe('No items in order!')
          })

          //
          test('Status 400 for empty order items', async () => {
            const validOrderWithEmptyItems = {
              ...validOrder,
              items: []
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyItems)
              .expect(400)

            expect(res.body.message).toBe('No items in order!')
          })
        })

        //
        describe('Notes Property', () => {
          //
          test('Undefined Notes defaults to empty string', async () => {
            const validOrderWithUndefinedNotes = {
              ...validOrder,
              notes: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedNotes)
              .expect(200)

            expect(res.body.notes).toBe('')
          })

          //
          test('Status 400 for note with more than 250 chars', async () => {
            const validOrderWithLengthyNotes = {
              ...validOrder,
              notes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s
                ed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                Ut enim ad minim veniam, quis nostrud exercitation ullamco labor
                is nisi ut aliquip ex ea commodo consequat. Duis aute irure d.
                This is now more than 250 Characters.`
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithLengthyNotes)
              .expect(400)

            expect(res.body.message).toBe('Notes are too long.')
          })
        })

        //
        describe('Cost-Related Properties', () => {

          //
          test('Undefined subtotal is replaced', async () => {
            const validOrderWithUndefinedSubtotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                subTotal: undefined
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedSubtotal)
              .expect(200)

            expect(res.body.costs.subTotal).toBe(6.98)
          })

          //
          test('Empty subtotal is replaced', async () => {
            const validOrderWithEmptySubtotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                subTotal: ''
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptySubtotal)
              .expect(200)

            expect(res.body.costs.subTotal).toBe(6.98)
          })

          //
          test('Invalid subtotal is replaced', async () => {
            const validOrderWithInvalidSubtotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                subTotal: -9999.99
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidSubtotal)
              .expect(200)

            expect(res.body.costs.subTotal).toBe(6.98)
          })

          //
          test('Undefined taxAmount is replaced', async () => {
            const validOrderWithUndefinedTaxAmount = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                taxAmount: undefined
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedTaxAmount)
              .expect(200)

            expect(res.body.costs.taxAmount).toBe(0.49)
          })

          //
          test('Empty taxAmount is replaced', async () => {
            const validOrderWithEmptyTaxAmount = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                taxAmount: ''
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyTaxAmount)
              .expect(200)

            expect(res.body.costs.taxAmount).toBe(0.49)
          })

          //
          test('Invalid taxAmount is replaced', async () => {
            const validOrderWithInvalidTaxAmount = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                taxAmount: -9999.99
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidTaxAmount)
              .expect(200)

            expect(res.body.costs.taxAmount).toBe(0.49)
          })

          //
          test('Undefined total is replaced', async () => {
            const validOrderWithUndefinedTotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                total: undefined
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedTotal)
              .expect(200)

            expect(res.body.costs.total).toBe(7.47)
          })

          //
          test('Empty total is replaced', async () => {
            const validOrderWithEmptyTotal = {
              ...validOrder,
              costs: {
                ...validOrder,
                total: '',
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyTotal)
              .expect(200)

            expect(res.body.costs.total).toBe(7.47)
          })

          //
          test('Invalid total is replaced', async () => {
            const validOrderWithInvalidTotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                total: -9999.99
              }
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidTotal)
              .expect(200)

            expect(res.body.costs.total).toBe(7.47)
          })
        })
      })

      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing valid order and admin token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and manager token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', managerToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and employee token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', employeeToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and user token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', userToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and guest token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', guestToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 401 providing valid order and invalid token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', 'invalidToken')
            .send(validOrder)
            .expect(401)
        })

        //
        test('Status 403 providing valid order and no token', async () => {
          await api
            .post('/api/orders')
            .send(validOrder)
            .expect(403)
        })
      })
    })

    //
    describe('GET Requests', () => {
      //
      describe('Data Validations', () => {
        //
        test('Status 200 data type is application/json', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', adminToken)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })
      })

      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing admin token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', adminToken)
            .expect(200)
        })

        //
        test('Status 200 providing manager token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', managerToken)
            .expect(200)
        })

        //
        test('Status 200 providing employeeToken token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', employeeToken)
            .expect(200)
        })

        //
        test('Status 401 providing user token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', userToken)
            .expect(401)
        })

        //
        test('Status 401 providing guest token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', guestToken)
            .expect(401)
        })

        //
        test('Status 401 providing an invalid token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', 'invalidToken')
            .expect(401)
        })

        //
        test('Status 403 providing no token', async () => {
          await api
            .get('/api/orders')
            .expect(403)
        })
      })
    })

    //
    describe('PUT Requests', () => {
      //
      describe('Data Validations', () => {
        let existingOrderId
        beforeEach(async () => {
          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          existingOrderId = res.body._id
        })

        //
        test('Status 200 data type is application/json', async () => {

          const validUpdatedOrder = {
            ...validOrder,
            update: 'NEW UPDATE'
          }
          const postingUser = await User.findOne({ username: 'TestAdmin' })

          const res = await api
            .put('/api/orders/' + existingOrderId)
            .set('x-access-token', adminToken)
            .send(validUpdatedOrder)
            .expect(200)
            .expect('Content-Type', /application\/json/)

          expect(res.body.user).toBe(postingUser.id)
        })

        //
        describe('Time Property', () => {
          //
          test('Order has createdAt, updatedAt properties', async () => {
            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send({ ...validOrder, update: 'UPDATED' })
              .expect(200)

            expect(res.body.createdAt).toBeDefined()
            expect(res.body.updatedAt).toBeDefined()
          })

          //
          test('Order updatedAt and createdAt timestamps differ', async () => {
            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send({ ...validOrder, update: 'Some new updated property' })
              .expect(200)

            const nowTime = new Date().getTime()
            const createdTime = new Date(res.body.createdAt).getTime()
            const updatedTime = new Date(res.body.updatedAt).getTime()
            const deltaT = Math.abs( updatedTime - nowTime )

            expect(createdTime).not.toBe(updatedTime)
            expect(createdTime <= updatedTime).toBe(true)
            expect(deltaT < 300).toBe(true) // Updated in the last 300 sec
          })
        })

        describe('Status Property', () => {
          //
          test('Undefined order status defaults to "In Progress"', async () => {
            const validOrderUndefinedStatus = {
              ...validOrder,
              status: undefined
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderUndefinedStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })

          //
          test('Empty order status defaults to "In Progress"', async () => {
            const validOrderWithEmptyStatus = {
              ...validOrder,
              status: ''
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })

          //
          test('Invalid order status defaults to "In Progress"', async () => {
            const validOrderWithInvalidStatus = {
              ...validOrder,
              status: 'INVALID STATUS'
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })
        })


        describe('Category Property', () => {
          //
          test('Undefined order category defaults to "Other"', async () => {
            const validOrderWithUndefinedCategory = {
              ...validOrder,
              category: undefined
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedCategory)
              .expect(200)

            expect(res.body.category).toBe('Other')
          })

          //
          test('Empty order category defaults to "Other"', async () => {
            const validOrderWithEmptyCategory = {
              ...validOrder,
              category: ''
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyCategory)
              .expect(200)

            expect(res.body.category).toBe('Other')
          })
        })

        describe('Name Property', () => {
          //
          test('Status 400 for undefined order name', async () => {
            const validOrderWithUndefinedName = {
              ...validOrder,
              name: undefined
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedName)
              .expect(400)

            expect(res.body.message).toBe('An order name is required.')
          })

          //
          test('Status 400 for empty order name', async () => {
            const validOrderWithEmptyName = {
              ...validOrder,
              name: ''
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyName)
              .expect(400)

            expect(res.body.message).toBe('An order name is required.')
          })
        })


        describe('Items Property', () => {
          //
          test('Status 400 for undefined order items', async () => {
            const validOrderWithUndefinedItems = {
              ...validOrder,
              items: undefined
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedItems)
              .expect(400)

            expect(res.body.message).toBe('No items in order!')
          })

          //
          test('Status 400 for empty order items', async () => {
            const validOrderWithEmptyItems = {
              ...validOrder,
              items: []
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyItems)
              .expect(400)

            expect(res.body.message).toBe('No items in order!')
          })
        })

        //
        describe('Notes Property', () => {
          //
          test('Undefined Notes defaults to empty string', async () => {
            const validOrderWithUndefinedNotes = {
              ...validOrder,
              notes: undefined
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedNotes)
              .expect(200)

            expect(res.body.notes).toBe('')
          })

          //
          test('Status 400 for note with more than 250 chars', async () => {
            const validOrderWithLengthyNotes = {
              ...validOrder,
              notes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, s
                ed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                Ut enim ad minim veniam, quis nostrud exercitation ullamco labor
                is nisi ut aliquip ex ea commodo consequat. Duis aute irure d.
                This is now more than 250 Characters.`
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithLengthyNotes)
              .expect(400)

            expect(res.body.message).toBe('Notes are too long.')
          })
        })

        //
        describe('Cost-Related Properties', () => {

          //
          test('Undefined subtotal is replaced', async () => {
            const validOrderWithUndefinedSubtotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                subTotal: undefined
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedSubtotal)
              .expect(200)

            expect(res.body.costs.subTotal).toBe(6.98)
          })

          //
          test('Empty subtotal is replaced', async () => {
            const validOrderWithEmptySubtotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                subTotal: ''
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptySubtotal)
              .expect(200)

            expect(res.body.costs.subTotal).toBe(6.98)
          })

          //
          test('Invalid subtotal is replaced', async () => {
            const validOrderWithInvalidSubtotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                subTotal: -9999.99
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidSubtotal)
              .expect(200)

            expect(res.body.costs.subTotal).toBe(6.98)
          })

          //
          test('Undefined taxAmount is replaced', async () => {
            const validOrderWithUndefinedTaxAmount = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                taxAmount: undefined
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedTaxAmount)
              .expect(200)

            expect(res.body.costs.taxAmount).toBe(0.49)
          })

          //
          test('Empty taxAmount is replaced', async () => {
            const validOrderWithEmptyTaxAmount = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                taxAmount: ''
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyTaxAmount)
              .expect(200)

            expect(res.body.costs.taxAmount).toBe(0.49)
          })

          //
          test('Invalid taxAmount is replaced', async () => {
            const validOrderWithInvalidTaxAmount = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                taxAmount: -9999.99
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidTaxAmount)
              .expect(200)

            expect(res.body.costs.taxAmount).toBe(0.49)
          })

          //
          test('Undefined total is replaced', async () => {
            const validOrderWithUndefinedTotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                total: undefined
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedTotal)
              .expect(200)

            expect(res.body.costs.total).toBe(7.47)
          })

          //
          test('Empty total is replaced', async () => {
            const validOrderWithEmptyTotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                total: ''
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyTotal)
              .expect(200)

            expect(res.body.costs.total).toBe(7.47)
          })

          //
          test('Invalid total is replaced', async () => {
            const validOrderWithInvalidTotal = {
              ...validOrder,
              costs: {
                ...validOrder.costs,
                total: -9999.99
              }
            }

            const res = await api
              .put('/api/orders/' + existingOrderId)
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidTotal)
              .expect(200)

            expect(res.body.costs.total).toBe(7.47)
          })
        })
      })

      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing admin token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', adminToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(200)

          expect(res.body.name).toBe('Updated Test Order')
          expect(res.body.notes).toBe('This is a test.')
        })

        //
        test('Status 200 providing manager token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', managerToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(200)

          expect(res.body.name).toBe('Updated Test Order')
          expect(res.body.notes).toBe('This is a test.')
        })

        //
        test('Status 200 providing employeeToken token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', employeeToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(200)

          expect(res.body.name).toBe('Updated Test Order')
          expect(res.body.notes).toBe('This is a test.')
        })

        //
        test('Status 401 providing user token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', userToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(401)

          expect(res.body.message).toBe('Requires Employee Role')
        })

        //
        test('Status 401 providing guest token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', guestToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(401)

          expect(res.body.message).toBe('Requires Employee Role')
        })

        //
        test('Status 401 providing an invalid token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', 'invalidToken')
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(401)

          expect(res.body.message).toBe('jwt malformed')
        })

        //
        test('Status 403 providing no token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(403)

          expect(res.body.message).toBe('No token provided')
        })
      })
    })

    //
    describe('DELETE Requests', () => {
      //
      describe('Data Validations', () => {
        //
        test('Status 200 has data type of application/json', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })

        //
        test('Status 204 for null query results', async () => {
          // Mongoose findByIdAndUpdate returns null if no object with id is
          //found. Currently, no special error is thrown.
          await api
            .delete('/api/items/' + 'NotARealId12')
            .expect(204)
        })

        //
        test('Status 500 with incorrect id format', async () => {
          // Mongoose throws a CastError, caught in errorHandler
          await api
            .delete('/api/items/' + '000')
            .expect(500)
        })
      })

      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing admin token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', adminToken)
            .expect(200)

          const orders = await Order.find({}).exec()
          expect(orders).toHaveLength(0)
        })

        //
        test('Status 200 providing manager token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', managerToken)
            .expect(200)

          const orders = await Order.find({}).exec()
          expect(orders).toHaveLength(0)
        })

        //
        test('Status 401 providing employeeToken token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', employeeToken)
            .expect(401)
        })

        //
        test('Status 401 providing user token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', userToken)
            .expect(401)
        })

        //
        test('Status 401 providing guest token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', guestToken)
            .expect(401)
        })

        //
        test('Status 401 providing an invalid token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', 'invalidToken')
            .expect(401)
        })

        //
        test('Status 403 providing no token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .expect(403)
        })
      })
    })
  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
