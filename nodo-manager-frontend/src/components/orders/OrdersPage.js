import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'

import { addOrderActionCreator } from '../../reducers/orderReducer'
import OrdersList from './OrdersList'

const OrdersPage = () => {

  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [items, setItems] = useState([])

  // Order action dispatchers
  const addOrder = (event) => {
    event.preventDefault()

    const orderObject = {
      foodItems: items,
    }

    dispatch(addOrderActionCreator(orderObject))
    setShow(false)
    setItems([])
  }

  const addItem = (event) => {
    event.preventDefault()
    setItems([...items, 'newItem'])
  }


  return (
    <Container className='pt-5'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='m-0'>Orders</h1>
        <Button onClick={ () => setShow(true) } variant='outline-secondary'>
          NEW ORDER
        </Button>
      </div>

      <Modal
        show={show}
        onHide={() => {
          setShow(false)
          setItems([])
        }}
        dialogClassName='modal-80w'
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Items to Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            items.map(item => <p>{item}</p>)
          }
        </Modal.Body>

        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outline-warning"
              onClick={ () => {
                setShow(false)
                setItems([])
              }}
            >Cancel</Button>
          <div>
            <Button onClick={ addItem } style={{ margin: '0 10px'}} variant="outline-secondary">
              Add Item
            </Button>
            <Button onClick={ addOrder } style={{ margin: '0 10px'}}>
              Done
            </Button>
          </div>
        </Modal.Footer>

      </Modal>

      <hr />
      <OrdersList />
    </Container>
  )
}

export default OrdersPage
