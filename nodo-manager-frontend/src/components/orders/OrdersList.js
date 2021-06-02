import React from 'react'
import { useSelector } from 'react-redux'

import OrderInfo from './OrderInfo'

const OrdersList = () => {

  const orders = useSelector(state => state.orders)

  return (
    <React.Fragment>
      {
        orders && orders.map(order =>
          <OrderInfo key={order._id} order={order} />
        )
      }
    </React.Fragment>
  )
}

export default OrdersList