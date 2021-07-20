import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import UpdateItemForm from './UpdateItemForm'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { destroyItemActionCreator } from '../../reducers/itemReducer'

import truncateString from '../../utilities/truncateString'

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
      <Card key={item._id}
        className='mx-0 my-0'
        style={{
          height: '32rem',
          minWidth: '18rem'
        }}
      >

        {/* Item name, category, price, description */}
        <Card.Header style={{height: '12rem'}}>
          <Card.Title className='d-flex justify-content-between'>
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
          <div className='d-flex justify-content-between'>
            <h6 className='m-0 py-auto align-self-center'>{item.availability}</h6>

            <Button
              onClick={ () => callDeleteItem(item._id) }
              size='sm' variant='outline-danger'
              style={{border: 'hidden'}}
            >Delete
            </Button>

            <Button
              onClick={ () => setShowUpdateForm(true) }
              className='px-4'
              variant='primary'
            >Edit
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
