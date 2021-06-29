const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const rolesInitializer = require('../utils/rolesInitializer')

const Role = require('../models/role')
const Item = require('../models/menuItem')

const api = supertest(app)

// Initialize roles database
beforeAll(() => {
  rolesInitializer()
  return
})

// Reset collections before each test
beforeEach(async () => {
  // items
  await Item.deleteMany({})
})

//
describe('Test Database Initializations', () => {
  test('roles are initialized', async () => {
    const roles = await Role.find({}).exec()
    expect(roles).toHaveLength(5)
  })
})

//
describe('Test Item Type', () => {
  test('items are returned as json', async () => {
    await api
      .get('/api/items')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

//
describe('Item CRUD operations', () => {
  describe('CREATE', () => {
    test('Successful creation of expected input', async () => {
      const newItem = ({
        name: 'Test Name',
        description: 'This is a description for this test.',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        category: 'Tester',
        price: 9999.99,
        availability: 'Available'
      })

      await api
        .post('/api/items')
        .send(newItem)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    // test('Failure upon empty input', async () => {
    //   const newItem = ({})
    //
    //   try {
    //     await api
    //       .post('/api/items')
    //       .send(newItem)
    //       .expect(400)
    //       .expect('Content-Type', /application\/json/)
    //   } catch (err) {
    //     expect(err).toMatch('ValidationError')
    //   }
    // })
  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
