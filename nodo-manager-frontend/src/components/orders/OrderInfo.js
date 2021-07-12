import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'

import {
  updateOrderActionCreator,
  deleteOrderActionCreator
} from '../../reducers/orderReducer'

const OrderInfo = ({ order }) => {

  const dispatch = useDispatch()

  const orderStatusColor = (status) => {
    const colorMap = {
      'In Progress': '#0062cc',
      'Complete': '#28a745',
      'Canceled': '#dc3545'
    }
    return colorMap[status]
  }

  const orderWithUpdates = {
    status: 'Complete',
    category: 'Carry Out',
    name: 'Ahun Gryper Son',
    // items: [{ "item1": "food1" }, { "item2": "drink1" }],
    notes: 'n/a',
    // subTotal: 9.50,
    // taxRate: 0.07,
    // taxAmount: 0.75,
    // total: 10.25
  }

  const completedOrder = {
    ...order,
    status: 'Complete'
  }

  const completeOrder = (id) => {
    dispatch(updateOrderActionCreator(id, completedOrder))
  }

  const deleteOrder = (id) => {
    dispatch(deleteOrderActionCreator(id))
  }

  const updateOrder = (id) => {
    dispatch(updateOrderActionCreator(id, orderWithUpdates))
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: orderStatusColor(order.status)}}>
        <div>
          <h2>{order.name}</h2>
          <h6>ID: {order._id}</h6>
        </div>
        <div>
          <h2 style={{ color: orderStatusColor(order.status) }}>{order.status}</h2>
          <h6>{new Date(order.time).toLocaleString()}</h6>
        </div>
        <div>
        </div>
        <div className='text-right'>
          <h2>{order.category}</h2>
          <h4 >Items: {order.items && order.items.length}</h4>
        </div>
      </div>

      <p>Notes: {order.notes}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='align-self-center'>
          <Button
            onClick={ () => deleteOrder(order._id) }
            variant='outline-danger'
            size='sm'
            style={{ border: 'hidden' }}
            className='mr-5 px-2'
          >
            Remove
          </Button>
          <Button
            onClick={ () => updateOrder(order._id) }
            variant='outline-secondary'
            size='sm'
            style={{ border: 'hidden' }}
            className='mx-2 px-5'
          >
            Edit
          </Button>
          <Button
            onClick={ () => completeOrder(order._id) }
            variant='outline-success'
            size='sm'
            style={{ border: 'hidden' }}
            className='mx-2 px-5'
          >
            Mark as Completed
          </Button>
        </div>

        <div className='mx-2'>
          <p className='m-0'>Subtotal: {order.subTotal}</p>
          <p className='m-0 text-right'>Total: {order.total}</p>
        </div>
      </div>

      <hr />
    </>
  )
}

export default OrderInfo
