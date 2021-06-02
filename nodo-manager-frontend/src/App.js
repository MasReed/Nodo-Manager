import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import {
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

import {
  initializeItems,
  addItemActionCreator
} from './reducers/itemReducer'

import {
  initializeOrders,
  addOrderActionCreator,
} from './reducers/orderReducer'

import {
  initializeUsers,
  addUserActionCreator,
} from './reducers/userReducer'

import ItemInfo from './components/items/ItemInfo'
import OrderInfo from './components/orders/OrderInfo'
import UserInfo from './components/users/UserInfo'


function App() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect(() => {
      dispatch(initializeItems())
      dispatch(initializeOrders())
      dispatch(initializeUsers())
  }, [ dispatch ])


  // Item action dispatchers
  const addItem = (event) => {
    event.preventDefault()
    dispatch(addItemActionCreator(
      {
        name: 'SOME CONTENT',
        description: 'A test',
        category: 'testing',
        ingredients: ['bread']
      }
    ))
  }

  // Order action dispatchers
  const addOrder = (event) => {
    event.preventDefault()
    dispatch(addOrderActionCreator())
  }

  // User action dispatchers
  const addUser = (event) => {
    event.preventDefault()
    dispatch(addUserActionCreator({
      name: 'newName',
      username: 'newUser',
      clearance: 'peon'
    }))
  }

  return (
    <div>
      <button onClick={ addItem }>ADD ITEM</button>
      <button onClick={ addOrder }>ADD ORDER</button>
      <button onClick={ addUser }>ADD USER</button>
      {!state.items && state.items.map(item => <ItemInfo key={item._id} item={item} />)}
      {!state.orders && state.orders.map(order => <OrderInfo key={order._id} order={order} />)}
      {state.users && state.users.map(user => <UserInfo  key={user.id} user={user} />)}
    </div>
  );
}

export default App;
