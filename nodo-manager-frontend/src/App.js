import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

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

import ItemsList from './components/items/ItemsList'
import OrdersList from './components/orders/OrdersList'
import UsersList from './components/users/UsersList'


function App() {

  const dispatch = useDispatch()

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
      <ItemsList />
      <OrdersList />
      <UsersList />
    </div>
  );
}

export default App;
