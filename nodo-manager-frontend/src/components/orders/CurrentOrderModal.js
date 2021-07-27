import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import MyOrderItems from './MyOrderItems'

import { resetCart } from '../../reducers/cartReducer'

const CurrentOrderModal = ({
  show,
  setShow,
  setSelectedItem,
  setShowCustomize,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  //
  const handleAddItem = () => {
    setShow(false)
    history.push('/menu')
  }

  //
  const handleCancelOrder = () => {
    setShow(false)
    dispatch(resetCart())
  }

  //
  const handleClose = () => {
    setShow(false)
  }

  //
  const handleSubmitOrder = () => {
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
        <MyOrderItems
          setSelectedItem={setSelectedItem}
          setShowCustomize={setShowCustomize}
        />
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
