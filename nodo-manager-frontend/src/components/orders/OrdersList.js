import React from 'react'
import { useSelector } from 'react-redux'

import OrderInfo from './OrderInfo'

const OrdersList = () => {

  const orders = useSelector(state => state.orders)

  //
  const sortByTime = (ordersArray) => {
    return ordersArray.slice().sort((a, b) => (
      new Date(b.updatedAt) - new Date(a.updatedAt)
    ))
  }

  //
  const sortByStatus = (ordersArray) => {
    const sortBy = ['In Progress', 'Complete']
    return ordersArray.slice().sort((a, b) => (
      sortBy.indexOf(a.status) - sortBy.indexOf(b.status)
    ))
  }

  const timeSortedOrders = sortByTime(orders)
  const statusSortedOrders = sortByStatus(timeSortedOrders)

  return (
    <>
      {
        orders && statusSortedOrders.map(order =>
          <OrderInfo key={order._id} order={order} />
        )
      }
    </>
  )
}

export default OrdersList
