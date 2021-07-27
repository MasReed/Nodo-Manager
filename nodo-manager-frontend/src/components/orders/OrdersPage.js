import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import CurrentOrderModal from './CurrentOrderModal'
import OrdersList from './OrdersList'
import UpdateCustomItemModal from './UpdateCustomItemModal'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { initializeOrders } from '../../reducers/orderReducer'

const OrdersPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const cart = useSelector((state) => state.cart)

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

  return (
    <Container className='pt-5'>

      {/* Order Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='m-0'>Orders</h1>
        <Button onClick={createNewOrder} variant='outline-secondary'>
          {cart.length > 0 ? 'CURRENT ORDER' : 'NEW ORDER'}
        </Button>
      </div>

      <hr />

      {/* All Orders */}
      <OrdersList />

      {/* Modal Component */}
      <CurrentOrderModal
        show={showCurrentOrder}
        setShow={setShowCurrentOrder}
        setShowCustomize={setShowCustomize}
        setSelectedItem={setSelectedItem}
      />

      {/* Modal Component */}
      <UpdateCustomItemModal
        show={showCustomize}
        setShow={setShowCustomize}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

    </Container>
  )
}

export default OrdersPage
