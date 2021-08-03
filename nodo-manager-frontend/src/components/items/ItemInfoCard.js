import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import UpdateItemForm from './UpdateItemForm'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { destroyItemActionCreator } from '../../reducers/itemReducer'

import truncateString from '../../utilities/truncateString'

//
const ItemInfoCard = ({ item }) => {
  const dispatch = useDispatch()

  const [showUpdateForm, setShowUpdateForm] = useState(false)

  //
  const callDeleteItem = async (id) => {
    try {
      dispatch(destroyItemActionCreator(id))
    } catch (err) {
      dispatch(toastAlertCreator(err))
    }
  }

  return (
    <>
      <Card key={item._id} className='h-100'>

        {/* Item name, category, price, description */}
        <Card.Header className='m-0 py-3'>
          <Card.Title className='d-flex justify-content-between'>
            <Card.Text className='mb-0 mr-2 text-wrap text-break'>{item.name}</Card.Text>
            <Card.Text className='mb-0 ml-2'>{`$${item.price}`}</Card.Text>
          </Card.Title>

          <Card.Subtitle className='mb-2 text-muted'>
            {item.category}
          </Card.Subtitle>

          <Card.Text className='text-wrap text-break'>{item.description}</Card.Text>
        </Card.Header>

        {/* Item Image */}
        <Card.Body className='m-0 pt-3 pb-0'>
          <Card.Img src='/assets/burger.svg' />
          <hr className='mb-0' />
        </Card.Body>

        {/* Ingredients */}
        <Card.Body className='m-0 py-3'>
          <Card.Text className='m-0 p-0'>
            <u>Ingredients:</u>
          </Card.Text>

          <Card.Text className='m-0 p-0 text-wrap text-break'>
            {
              truncateString(item.ingredients.join(', '), 130)
            }
          </Card.Text>
        </Card.Body>

        {/* Item availability, Delete and Update Buttons */}
        <Card.Footer className='m-0 py-3'>
          <div className='d-flex justify-content-between'>
            <h6 className='m-0 py-auto align-self-center'>{item.availability}</h6>

            <Button
              onClick={() => callDeleteItem(item._id)}
              size='sm'
              variant='outline-danger'
              style={{ border: 'hidden' }}
            >
              Delete
            </Button>

            <Button
              onClick={() => setShowUpdateForm(true)}
              className='px-4'
              variant='primary'
            >
              Edit
            </Button>

          </div>
        </Card.Footer>
      </Card>

      {/* Modal Form Component */}
      <UpdateItemForm
        item={item}
        show={showUpdateForm}
        setShow={setShowUpdateForm}
      />
    </>
  )
}

export default ItemInfoCard
