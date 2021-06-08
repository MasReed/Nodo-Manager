import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

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
    dispatch(updateItemActionCreator(item._id, item))
  }

  const deleteItem = (id) => {
    dispatch(destroyItemActionCreator(id))
  }

  const truncateIngredients = (str) => {
    return str.length > 130 ? str.substring(0, 131) + ' ...' : str
  }

  return (
    <Col className='container-fluid mb-4 px-2'>
      <Card
        className='mx-0 my-0'
        style={{
          height: '32rem',
          minWidth: '18rem',
          maxWidth: '32rem'
        }}
      >
        <Card.Header style={{height: '12rem'}}>
          <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
            {item.name}
            <span>${item.price}</span>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {item.category}
          </Card.Subtitle>

          <Card.Text>
            {item.description}
          </Card.Text>
        </Card.Header>

        <Card.Body>
          <Card.Img variant='top' src='/assets/burger.svg' Height='55%'/>
          <hr />
          <Card.Text className='mb-0'>
            <u>Ingredients:</u>
          </Card.Text>

          <Card.Text>
            {
              truncateIngredients(item.ingredients.join(', '))
            }
          </Card.Text>
        </Card.Body>

        <Card.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={ () => deleteItem(item._id) }
              size='sm' variant='outline-danger'
              style={{border: 'hidden'}}
            >Delete
            </Button>
            <Button
              onClick={ () => setShowUpdateForm(true) }
              size='sm' variant='outline-primary'
              style={{ border: 'hidden'}}
            >Edit
            </Button>
            <h6 style={{ margin: '0', padding: '6px 0' }}>
              {item.availability}
            </h6>
          </div>
        </Card.Footer>
      </Card>

      <UpdateItemForm
        item={item}
        updateItem={updateItem}
        show={showUpdateForm}
        setShow={setShowUpdateForm}
      />
    </Col>
  )
}

export default ItemInfo
