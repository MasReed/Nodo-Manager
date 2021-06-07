import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import {
  updateItemActionCreator,
  destroyItemActionCreator
} from '../../reducers/itemReducer'

const ItemInfo = ({ item }) => {

  const dispatch = useDispatch()

  const itemWithUpdates = {
    name: 'Updated',
    description: 'A simple update',
    ingredients: ['updated', 'this', 'one'],
    category: 'Food',
    price: 9.99,
    availability: 'available'
  }

  const updateItem = (id) => {
    dispatch(updateItemActionCreator(id, itemWithUpdates))
  }

  const deleteItem = (id) => {
    dispatch(destroyItemActionCreator(id))
  }

  return (
    <Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
          {item.name}
          <span>${item.price}</span>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>

        <Card.Text>{item.description}</Card.Text>

        <hr />

        <Card.Text>
          <Card.Subtitle className="mb-1 text-muted">Ingredients</Card.Subtitle>
          <ListGroup variant="flush">
            {(item.ingredients) && item.ingredients.map(ingredient => (
              <ListGroup.Item
                key={ingredient}
                style={{ border: 'none', padding: '1px'}}
              >- {ingredient}</ListGroup.Item>
              ))
            }
          </ListGroup>
        </Card.Text>

        <hr />

        <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={ () => deleteItem(item._id) } size='sm' variant='outline-danger' style={{border: 'hidden'}}>Delete</Button>
          <Button onClick={ () => updateItem(item._id) } size='sm' variant='outline-primary' style={{ border: 'hidden'}}>Edit</Button>
          <h6 style={{ margin: '0', padding: '6px 0' }}>{item.availability}</h6>
        </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default ItemInfo

// style={{ border: '0', margin: '0', padding: '0' }}
// <Button onClick={ () => updateItem(item._id) } size='sm' variant='outline-secondary' style={{ padding: '0 2px'}}>Edit</Button>
