import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { addOrderActionCreator } from '../../reducers/orderReducer'


const YourOrderModal = ({ show, setShow, orderItems, setOrderItems }) => {

  const dispatch = useDispatch()

  const addOrder = (event) => {
    event.preventDefault()

    const orderObject = {
      foodItems: orderItems,
    }

    dispatch(addOrderActionCreator(orderObject))
    setShow(false)
    setOrderItems([])
  }


  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      dialogClassName='modal-80w'
      backdrop="static"
      keyboard={false}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          orderItems.map(item => <p key={item}>{item}</p>)
        }
      </Modal.Body>

      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outline-warning"
            onClick={ () => {
              setShow(false)
              setOrderItems([])
            }}
          >Cancel</Button>
        <div>
          <Button onClick={() => setShow(false) } style={{ margin: '0 10px'}} variant="outline-secondary">Add More</Button>
          <Button onClick={ addOrder } style={{ margin: '0 10px'}}>Checkout</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default YourOrderModal
