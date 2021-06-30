const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const rolesInitializer = require('../utils/rolesInitializer')

const Role = require('../models/role')
const Item = require('../models/menuItem')

const api = supertest(app)

const initialItems = [
  {
    name: 'Test Name 1',
    description: 'This is a description for this test.',
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    category: 'Tester 1',
    price: 9999.99,
    availability: 'Available'
  },
  {
    name: 'Test Name 2',
    description: 'This is also description for this test.',
    ingredients: ['Ingredient 3', 'Ingredient 2', 'Ingredient 1'],
    category: 'Tester 2',
    price: 1111.11,
    availability: 'Unavailable'
  }
]

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
describe('Item CRUD operations', () => {
  describe('POST Requests', () => {
    //
    test('Successful JSON creation from expected input', async () => {
      const newItem = initialItems[0]

      await api
        .post('/api/items')
        .send(newItem)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    //
    test('Undefined item name results in Status 400.', async () => {
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
    test('Undefined description defaults to empty string', async () => {
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
    test('Undefined ingredients defaults to empty Array', async () => {
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
    test('Undefined category results in Status 400', async () => {
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
    test('Undefined price results in Status 400', async () => {
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
    test('Undefined availability defaults to unavailable', async () => {
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

  describe('GET Requests', () => {

    beforeEach(async () => {
      await Item.deleteMany({})

      await api.post('/api/items').send(initialItems[0])
      await api.post('/api/items').send(initialItems[1])
    })

    test('All items are returned and as json', async () => {
        const res = await api
          .get('/api/items')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        expect(res.body).toHaveLength(2)
      })

      // test('')

  })

  describe('PUT Requests', () => {

  })

  describe('DELETE Requests', () => {
    test('Successful deletion given an id', async () => {
      const res = await api
        .post('/api/items')
        .send(initialItems[0])

      await api
        .delete('/api/items/' + res.body._id)
        .expect(204)

      const items = await api
        .get('/api/items')

      expect(items.body).toHaveLength(0)
    })

    test('invalid id still results in Status 204', async () => {
      await api
        .delete('/api/items/' + 'NotARealId12')
        .expect(204)
    })

    test('incorrect id format results in Status 500', async () => {
      // Mongoose throws a CastError, caught in errorHandler
      await api
        .delete('/api/items/' + '000')
        .expect(500)
    })
  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
