import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import CurrentOrderModal from './CurrentOrderModal'
import OrdersList from './OrdersList'
import ItemCustomizationModal from '../menu/ItemCustomizationModal'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { isVisible } from '../../reducers/modalReducer'
import { initializeOrders } from '../../reducers/orderReducer'

const OrdersPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentOrder = useSelector((state) => state.currentOrder)
  const orders = useSelector((state) => state.orders)

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
    if (currentOrder.items.length > 0) {
      setShowCurrentOrder(true)
      dispatch(isVisible(true))
    } else {
      history.push('/menu')
    }
  }

  return (
    <Container className='pt-5'>

      {/* Order Page Header */}
      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>Orders</h1>
        <Button onClick={createNewOrder} variant='outline-secondary'>
          {currentOrder.items && currentOrder.items.length > 0 ? 'CURRENT ORDER' : 'NEW ORDER'}
        </Button>
      </div>

      <hr />

      {/* All Orders */}
      <OrdersList orders={orders} />

      {/* Modal Component */}
      <CurrentOrderModal
        show={showCurrentOrder}
        setShow={setShowCurrentOrder}
        setShowCustomize={setShowCustomize}
        setSelectedItem={setSelectedItem}
      />

      {/* Modal Component */}
      <ItemCustomizationModal
        item={selectedItem}
        setItem={setSelectedItem}
        show={showCustomize}
        setShow={setShowCustomize}
      />

    </Container>
  )
}

export default OrdersPage
