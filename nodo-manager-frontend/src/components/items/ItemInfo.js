import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import {
  updateItemActionCreator,
  destroyItemActionCreator
} from '../../reducers/itemReducer'

const ItemInfo = ({ item }) => {

  const dispatch = useDispatch()

  const itemWithUpdates = {
    name: 'U1',
    description: 'UPDATED0',
    category: 'testing',
    ingredients: ['updated']
  }

  const updateItem = (id) => {
    dispatch(updateItemActionCreator(id, itemWithUpdates))
  }

  const deleteItem = (id) => {
    dispatch(destroyItemActionCreator(id))
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
        <Card.Text>{item.description}</Card.Text>

        <ul>
          {(item.ingredients) && item.ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))
          }
        </ul>

        <Button onClick={ () => deleteItem(item._id) } size='sm' variant='outline-secondary'>DELETE</Button>
        <Button onClick={ () => updateItem(item._id) } size='sm' variant='outline-secondary'>UPDATE</Button>
      </Card.Body>
    </Card>
  )
}

export default ItemInfo
