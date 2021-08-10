import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import OrderPage from './OrderPage'

import { resetCart } from '../../reducers/cartReducer'
import { isVisible } from '../../reducers/modalReducer'

const CurrentOrderModal = ({
  show,
  setShow,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  //
  const handleClose = async () => {
    await dispatch(isVisible(false))
    setShow(false)
  }

  //
  const handleAddItem = async () => {
    handleClose()
    history.push('/menu')
  }

  //
  const handleCancelOrder = async () => {
    handleClose()
    await dispatch(resetCart())
  }

  //
  const handleSubmitOrder = async () => {
    handleClose()
    history.push('/my-order')
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName='modal-80w'
      backdrop='static'
      keyboard={false}
      scrollable
    >
      {/* Title */}
      <Modal.Header closeButton>
        <Modal.Title>Current Order Items</Modal.Title>
      </Modal.Header>

      {/* Current Items in Order */}
      <Modal.Body>
        <OrderPage />
      </Modal.Body>

      {/* Buttons */}
      <Modal.Footer className='d-flex justify-content-between'>
        <Button
          variant='outline-warning'
          onClick={handleCancelOrder}
        >
          Cancel Order
        </Button>

        <div>
          <Button
            variant='outline-secondary'
            onClick={handleAddItem}
            className='mx-2'
          >
            Add Item
          </Button>

          <Button
            variant='primary'
            onClick={handleSubmitOrder}
            className='mx-2'
          >
            Add Order Details
          </Button>
        </div>
      </Modal.Footer>

    </Modal>
  )
}

export default CurrentOrderModal
