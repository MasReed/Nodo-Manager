import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'

import EditOrderModal from './EditOrderModal'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { setCurrentOrder } from '../../reducers/currentOrderReducer'
import { isVisible } from '../../reducers/modalReducer'
import {
  updateOrderActionCreator,
  deleteOrderActionCreator,
} from '../../reducers/orderReducer'

const OrderInfo = ({ order }) => {
  const dispatch = useDispatch()

  const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false)

  const orderStatusColor = (status) => {
    const colorMap = {
      'In Progress': '#0062cc',
      Complete: '#28a745',
      Canceled: '#dc3545',
    }
    return colorMap[status]
  }

  const changeOrderStatus = async (orderObject) => {
    try {
      let newStatusOrder

      if (orderObject.status === 'Complete') {
        newStatusOrder = {
          ...orderObject,
          status: 'In Progress',
        }
      } else {
        newStatusOrder = {
          ...orderObject,
          status: 'Complete',
        }
      }

      await dispatch(updateOrderActionCreator(order._id, newStatusOrder))
    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  const deleteOrder = async (id) => {
    try {
      await dispatch(deleteOrderActionCreator(id))
    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  const updateOrderSequence = async () => {
    await dispatch(setCurrentOrder(order))
    try {
      await setShowUpdateOrderModal(true)
      await dispatch(isVisible(true))
    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between' style={{ color: orderStatusColor(order.status) }}>
        <div>
          <h2>{order.name}</h2>
          <h6>{`ID: ${order._id}`}</h6>
        </div>
        <div>
          <h2 style={{ color: orderStatusColor(order.status) }}>{order.status}</h2>
          <p>
            <small>
              {`Updated: ${new Date(order.updatedAt).toLocaleString()}`}
            </small>
          </p>
        </div>
        <div />
        <div className='text-right'>
          <h2>{order.category}</h2>
          <h4>{`Items: ${order.items && order.items.length}`}</h4>
        </div>
      </div>

      <p>
        {`Notes: ${order.notes}`}
      </p>

      <div className='d-flex justify-content-between'>
        <div className='align-self-center'>

          {/* Remove Order */}
          <Button
            onClick={() => deleteOrder(order._id)}
            variant='outline-danger'
            size='sm'
            style={{ border: 'hidden' }}
            className='mr-5 px-2'
          >
            Remove
          </Button>

          {/* Edit Order */}
          <Button
            onClick={updateOrderSequence}
            variant='outline-secondary'
            size='sm'
            style={{ border: 'hidden' }}
            className='mx-2 px-5'
            disabled={order.status === 'Complete'}
          >
            Edit
          </Button>

          {/* Update Status */}
          <Button
            onClick={() => changeOrderStatus(order)}
            variant='outline-success'
            size='sm'
            style={{ border: 'hidden' }}
            className='mx-2 px-5'
          >
            {order.status === 'In Progress'
              ? 'Mark as \'Complete\''
              : 'Mark as \'In Progress\''}
          </Button>
        </div>

        {/* Order Cost Details */}
        <div className='mx-2'>
          <p className='m-0'>
            {`Subtotal: ${order.costs.subTotal}`}
          </p>
          <p className='m-0 text-right'>
            {`Total: ${order.costs.total}`}
          </p>
        </div>
      </div>

      <hr />

      {/* Modal Component */}
      <EditOrderModal
        order={order}
        show={showUpdateOrderModal}
        setShow={setShowUpdateOrderModal}
      />
    </>
  )
}

export default OrderInfo
