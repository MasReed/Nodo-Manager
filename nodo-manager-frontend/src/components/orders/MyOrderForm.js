import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { addOrderActionCreator } from '../../reducers/orderReducer'
import { resetCart } from '../../reducers/cartReducer'


const MyOrderForm = ({ costs }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const cartItems = useSelector(state => state.cart)

  const [orderName, setOrderName] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [orderCategory, setOrderCategory] = useState('Carry Out')

  const addOrder = (event) => {
    event.preventDefault()

    if (cartItems.length > 0) {
      const orderObject = {
        category: orderCategory,
        items: cartItems,
        name: orderName,
        notes: orderNotes,
        subTotal: costs.subTotal,
        taxRate: 0.07,
        taxAmount: costs.taxAmount,
        total: costs.total
      }

      dispatch(addOrderActionCreator(orderObject))
      dispatch(resetCart())
      history.push('/order-confirmed')
    } else {
      window.alert('No items in order!')
      history.push('/menu')
    }
  }


  return (
    <Form id='myOrderForm' onSubmit={ addOrder }>
      <Form.Group>
        <ButtonGroup toggle>
          <ToggleButton
            type='radio'
            name='carry-out-toggle'
            variant='outline-primary'
            value={orderCategory}
            checked={orderCategory === 'Carry Out'}
            onChange={ () => setOrderCategory('Carry Out') }
          >Carry Out
          </ToggleButton>

          <ToggleButton
            type='radio'
            name='delivery-toggle'
            variant='outline-primary'
            value={orderCategory}
            checked={orderCategory === 'Delivery'}
            onChange={ () => setOrderCategory('Delivery') }
          >Delivery
          </ToggleButton>
        </ButtonGroup>
        <Form.Text>{orderCategory} selected.</Form.Text>
      </Form.Group>

      <Form.Row className='ml-0 mr-0'>
        <Col lg='auto' className='pl-0'>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              value={orderName}
              onChange={ ({ target }) => setOrderName(target.value) }
              placeholder='e.g. Jane Doe'
            />
          </Form.Group>
        </Col>

        <Col className='pr-0'>
          <Form.Group>
            <Form.Label>Order Notes:</Form.Label>
            <Form.Control
              value={orderNotes}
              onChange={ ({ target }) => setOrderNotes(target.value) }
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  )
}

export default MyOrderForm
