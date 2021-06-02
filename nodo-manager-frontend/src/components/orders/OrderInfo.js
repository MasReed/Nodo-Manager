import React from 'react'
import { useDispatch } from 'react-redux'

import {
  updateOrderActionCreator,
  deleteOrderActionCreator
} from '../../reducers/orderReducer'

const OrderInfo = ({ order }) => {

  const dispatch = useDispatch()

  const orderWithUpdates = {
    "foodItems": [{ "item1": "food1" }],
    "drinkItems": [{ "item1": "drink1" }, { "item2": "drink2" }],
    "subTotal": 9.50,
    "taxRate": 0.07,
    "taxAmount": 0.75,
    "Total": 10.25
  }

  const updateOrder = (id) => {
    dispatch(updateOrderActionCreator(id, orderWithUpdates))
  }

  const deleteOrder = (id) => {
    dispatch(deleteOrderActionCreator(id))
  }

  return (
    <div>
      <h2>ID: {order._id}</h2>
      <button onClick={ () => deleteOrder(order._id) }>DELETE</button>
      <button onClick={ () => updateOrder(order._id) }>UPDATE</button>
      <h4>Food Items: {order.foodItems && order.foodItems.length}</h4>
      <h4>Drink Items: {order.foodItems && order.drinkItems.length}</h4>
      <p>Subtotal: {order.subTotal}</p>
      <p>Total: {order.Total}</p>
    </div>
  )
}

export default OrderInfo
