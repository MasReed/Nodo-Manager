import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'

import MyOrderItems from './MyOrderItems'
import OrdersList from './OrdersList'
import UpdateCustomItemModal from './UpdateCustomItemModal'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { resetCart } from '../../reducers/cartReducer'
import { initializeOrders } from '../../reducers/orderReducer'

const OrdersPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const cart = useSelector(state => state.cart)

  const [showCurrentOrder, setShowCurrentOrder] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

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
      setShowCurrentOrder(true)
    } else {
      history.push('/menu')
    }
  }

  //
  const handleAddItem = () => {
    setShowCurrentOrder()(false)
    history.push('/menu')
  }

  //
  const handleCancelOrder = () => {
    setShowCurrentOrder(false)
    dispatch(resetCart())
  }

  //
  const handleClose = () => {
    setShowCurrentOrder(false)
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
        show={showCurrentOrder}
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
          <MyOrderItems
            setSelectedItem={setSelectedItem}
            setShowCustomize={setShowCustomize}
          />
        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-between'>
          <Button
            variant='outline-warning'
            onClick={ handleCancelOrder }
          >
            Cancel Order
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

      <UpdateCustomItemModal
        show={showCustomize}
        setShow={setShowCustomize}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <hr />
      <OrdersList />
    </Container>
  )
}

export default OrdersPage
