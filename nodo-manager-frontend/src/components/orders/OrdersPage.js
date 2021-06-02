import React from 'react'
import { useDispatch } from 'react-redux'

import { addOrderActionCreator } from '../../reducers/orderReducer'
import OrdersList from './OrdersList'

const OrdersPage = () => {

  const dispatch = useDispatch()

  // Order action dispatchers
  const addOrder = (event) => {
    event.preventDefault()
    dispatch(addOrderActionCreator())
  }


  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Orders Page</h2>
      <button onClick={ addOrder }>ADD ORDER</button>
      <hr />
      <OrdersList />
    </div>
  )
}

export default OrdersPage
