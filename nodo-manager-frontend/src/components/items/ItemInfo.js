import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import {
  updateItemActionCreator,
  destroyItemActionCreator
} from '../../reducers/itemReducer'

import UpdateItemForm from './UpdateItemForm'

const ItemInfo = ({ item }) => {

  const dispatch = useDispatch()

  const [showUpdateForm, setShowUpdateForm] = useState(false)


  const updateItem = (item) => {
    setShowUpdateForm(true)
    console.log('UPDATEDITEM IN ITEMINFO', item)
    dispatch(updateItemActionCreator(item._id, item))
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
          <Button onClick={ () => setShowUpdateForm(true) } size='sm' variant='outline-primary' style={{ border: 'hidden'}}>Edit</Button>
          <h6 style={{ margin: '0', padding: '6px 0' }}>{item.availability}</h6>
        </Card.Text>

        <UpdateItemForm item={item} updateItem={updateItem} show={showUpdateForm} setShow={setShowUpdateForm}/>

      </Card.Body>
    </Card>
  )
}

export default ItemInfo
