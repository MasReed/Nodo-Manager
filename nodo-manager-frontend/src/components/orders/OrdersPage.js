import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'

import MyOrderItems from './MyOrderItems'
import OrdersList from './OrdersList'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { resetCart } from '../../reducers/cartReducer'
import { initializeOrders } from '../../reducers/orderReducer'

const OrdersPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const cart = useSelector(state => state.cart)

  const [show, setShow] = useState(false)

  useEffect(() => {
    const init = async () => {
      await dispatch(initializeOrders())
    }
    const onErr = async (err) => {
      await dispatch(toastAlertCreator(err))
    }

    try {
      init()
    } catch (err) {
      onErr(err)
    }
  }, [dispatch])


  //
  const createNewOrder = () => {
    if (cart.length > 0) {
      setShow(true)
    } else {
      history.push('/menu')
    }
  }

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

  return (
    <Container className='pt-5'>

      {/* Order Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='m-0'>Orders</h1>
        <Button onClick={ createNewOrder } variant='outline-secondary'>
          {cart.length > 0 ? 'CURRENT ORDER' : 'NEW ORDER'}
        </Button>
      </div>

      <Modal
        show={show}
        onHide={ handleClose }
        dialogClassName='modal-80w'
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Current Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MyOrderItems />
        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-between'>
          <Button
            variant='outline-warning'
            onClick={ handleCancelOrder }
          >
            Cancel
          </Button>

          <div>
            <Button
              variant='outline-secondary'
              onClick={ handleAddItem }
              className='mx-2'
            >
              Add Item
            </Button>

            <Button
              variant='primary'
              onClick={ handleClose }
              className='mx-2'
            >
              Close
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
