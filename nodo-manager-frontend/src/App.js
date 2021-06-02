import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  initializeItems,
  addItemActionCreator,
  updateItemActionCreator,
  destroyItemActionCreator
} from './reducers/itemReducer'

import {
  initializeOrders,
  addOrderActionCreator,
  updateOrderActionCreator,
  deleteOrderActionCreator
} from './reducers/orderReducer'


function App() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect(() => {
      dispatch(initializeItems())
      dispatch(initializeOrders())
  }, [ dispatch ])


  //TEMP Data
  const newContent = {
    name: 'SOME CONTENT',
    description: 'A test',
    category: 'testing',
    ingredients: ['bread']
  }
  const itemWithUpdates = {
    name: 'U1',
    description: 'UPDATED0',
    category: 'testing',
    ingredients: ['updated']
  }
  const orderWithUpdates = {
  	"foodItems": [{ "item1": "food1" }],
  	"drinkItems": [{ "item1": "drink1" }, { "item2": "drink2" }],
  	"subTotal": 9.50,
  	"taxRate": 0.07,
  	"taxAmount": 0.75,
  	"Total": 10.25
}

  // Item action dispatchers
  const addItem = (event) => {
    event.preventDefault()
    dispatch(addItemActionCreator(newContent))
  }

  const updateItem = (id) => {
    dispatch(updateItemActionCreator(id, itemWithUpdates))
  }

  const deleteItem = (id) => {
    dispatch(destroyItemActionCreator(id))
  }

  // Order action dispatchers
  const addOrder = (event) => {
    event.preventDefault()
    dispatch(addOrderActionCreator())
  }

  const updateOrder = (id) => {
    dispatch(updateOrderActionCreator(id, orderWithUpdates))
  }

  const deleteOrder = (id) => {
    dispatch(deleteOrderActionCreator(id))
  }


  const ItemInfo = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <button onClick={ () => deleteItem(item._id) }>DESTROY</button>
        <button onClick={ () => updateItem(item._id) }>UPDATE</button>
        <h4>{item.description}</h4>
        <p>{item.category}</p>
        <ul>
          {(item.ingredients) && item.ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))
          }
        </ul>
      </div>
    )
  }

  const OrderInfo = ({ order }) => {
    return (
      <div>
        <h2>ID: {order._id}</h2>
        <button onClick={ () => deleteOrder(order._id) }>DESTROY</button>
        <button onClick={ () => updateOrder(order._id) }>UPDATE</button>
        <h4>Food Items: {order.foodItems && order.foodItems.length}</h4>
        <h4>Drink Items: {order.foodItems && order.drinkItems.length}</h4>
        <p>Subtotal: {order.subTotal}</p>
        <p>Total: {order.Total}</p>
      </div>
    )
  }

  return (
    <div>
      <button onClick={ addItem }>ADD ITEM</button>
      <button onClick={ addOrder }>ADD ORDER</button>
      {!state.items && state.items.map(item => <ItemInfo key={item._id} item={item} />)}
      {state.orders && state.orders.map(order => <OrderInfo key={order._id} order={order} />)}
    </div>
  );
}

export default App;
