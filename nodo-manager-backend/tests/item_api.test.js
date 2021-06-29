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
    //
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

    //
    test('No item name results in Status 400.', async () => {
      const newItem = ({
        description: 'This is a description for this test.',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        category: 'Tester',
        price: 9999.99,
        availability: 'Available'
      })

      await api
        .post('/api/items')
        .send(newItem)
        .expect(400)
        .expect( res => {
          expect(res.text).toContain('An item name is required.')
        })
    })

    //
    test('No description defaults to empty string', async () => {
      const newItem = ({
        name: 'Item Name For A Test',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        category: 'Tester',
        price: 9999.99,
        availability: 'Available'
      })

      await api
        .post('/api/items')
        .send(newItem)
        .expect(200)
        .expect( res => {
          expect(res.body.description).toEqual('')
        })
    })

    //
    test('No ingredients defaults to empty Array', async () => {
      const newItem = ({
        name: 'Item Name For A Test',
        description: 'This is a description for this test.',
        category: 'Tester',
        price: 9999.99,
        availability: 'Available'
      })

      await api
        .post('/api/items')
        .send(newItem)
        .expect(200)
        .expect( res => {
          expect(res.body.ingredients).toEqual([])
        })
    })

    //
    test('No category results in Status 400', async () => {
      const newItem = ({
        name: 'Item Name For A Test',
        description: 'This is a description for this test.',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        price: 9999.99,
        availability: 'Available'
      })

      await api
        .post('/api/items')
        .send(newItem)
        .expect(400)
        .expect( res => {
          expect(res.text).toContain('Item must have a category.')
        })
    })

    //
    test('No price results in Status 400', async () => {
      const newItem = ({
        name: 'Item Name For A Test',
        description: 'This is a description for this test.',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        category: 'Tester',
        availability: 'Available'
      })

      await api
        .post('/api/items')
        .send(newItem)
        .expect(400)
        .expect( res => {
          expect(res.text).toContain('Item must have a price.')
        })
    })

    //
    test('No availability defaults to unavailable', async () => {
      const newItem = ({
        name: 'An Item Name',
        description: 'This is a description for this test.',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        category: 'Tester',
        price: 9999.99,
      })

      await api
        .post('/api/items')
        .send(newItem)
        .expect(200)
        .expect( res => {
          expect(res.body.availability).toEqual('Unavailable')
        })
    })


  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
