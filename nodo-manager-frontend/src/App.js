import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  Link
} from "react-router-dom";

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

  const navBtnStyle = {
    padding: '10px',
    margin: '10px 0'
  }

  return (
    <div>
      <React.Fragment>
        <nav  style={navBtnStyle}>
          <Link to='/' style={navBtnStyle}>Home</Link>
          <Link to='/items' style={navBtnStyle}>Items</Link>
          <Link to='/orders' style={navBtnStyle}>Orders</Link>
          <Link to='/users' style={navBtnStyle}>Users</Link>
        </nav>
        <hr />
      </React.Fragment>

      <React.Fragment>
        <Switch>

          <Route path='/items'>
            <button onClick={ addItem }>ADD ITEM</button>
            <ItemsList />
          </Route>

          <Route path='/orders'>
            <button onClick={ addOrder }>ADD ORDER</button>
            <OrdersList />
          </Route>

          <Route path='/users'>
            <button onClick={ addUser }>ADD USER</button>
            <UsersList />
          </Route>

          <Route path='/'>
            {<h2>Signup or Login</h2>}
          </Route>

          <Route path="*">
            {<h2>Not Found</h2>}
          </Route>

        </Switch>
      </React.Fragment>

    </div>
  )
}

export default App;
