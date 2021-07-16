import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import UpdateItemForm from './UpdateItemForm'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { destroyItemActionCreator } from '../../reducers/itemReducer'

import truncateString from '../../utilities/truncateString'

//
const ItemInfo = ({ item }) => {

  const dispatch = useDispatch()

  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const callDeleteItem = async (id) => {
    try {
      dispatch(destroyItemActionCreator(id))

    } catch (err) {
      dispatch(toastAlertCreator(err))
    }
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
        {/* Item name, category, price, description */}
        <Card.Header style={{height: '12rem'}}>
          <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
            {item.name}
            <span>${item.price}</span>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {item.category}
          </Card.Subtitle>

          <Card.Text>{item.description}</Card.Text>
        </Card.Header>

        {/* Item Image, Ingredients */}
        <Card.Body>
          <Card.Img variant='top' src='/assets/burger.svg' height='55%'/>
          <hr />

          <Card.Text className='mb-0'>
            <u>Ingredients:</u>
          </Card.Text>

          <Card.Text>
            {
              truncateString(item.ingredients.join(', '), 130)
            }
          </Card.Text>
        </Card.Body>

        {/* Item availability, Delete and Update Buttons */}
        <Card.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={ () => callDeleteItem(item._id) }
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

            <h6 className='m-0 py-1'>{item.availability}</h6>
          </div>
        </Card.Footer>
      </Card>

      {/* Modal Form Component */}
      <UpdateItemForm
        item={item}
        show={showUpdateForm}
        setShow={setShowUpdateForm}
      />
    </Col>
  )
}

export default ItemInfo
