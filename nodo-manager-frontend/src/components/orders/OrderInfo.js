import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'

import {
  updateOrderActionCreator,
  deleteOrderActionCreator
} from '../../reducers/orderReducer'

const OrderInfo = ({ order }) => {

  const dispatch = useDispatch()

  const orderWithUpdates = {
    category: 'Carry Out',
    name: 'Ahun Gryper Son',
    items: [{ "item1": "food1" }, { "item2": "drink1" }],
    notes: 'n/a',
    subTotal: 9.50,
    taxRate: 0.07,
    taxAmount: 0.75,
    total: 10.25
  }

  const updateOrder = (id) => {
    dispatch(updateOrderActionCreator(id, orderWithUpdates))
  }

  const deleteOrder = (id) => {
    dispatch(deleteOrderActionCreator(id))
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <h2>{order.name}</h2>
          <h6>ID: {order._id}</h6>
        </div>
        <div className='text-right'>
          <h2>{order.category}</h2>
          <h4 >Items: {order.items && order.items.length}</h4>
        </div>
      </div>

      <p>Notes: {order.notes}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <Button
            onClick={ () => deleteOrder(order._id) }
            variant='outline-danger'
            size='sm'
            style={{ border: 'hidden', marginTop: '8px'}}
          >
            Remove
          </Button>
          <Button
            onClick={ () => updateOrder(order._id) }
            variant='outline-secondary'
            size='sm'
            style={{ border: 'hidden', marginTop: '8px'}}
          >
            Edit
          </Button>
        </div>
        <div>
          <p className='m-0'>Subtotal: {order.subTotal}</p>
          <p className='m-0 text-right'>Total: {order.total}</p>
        </div>
      </div>

      <hr />
    </>
  )
}

export default OrderInfo
