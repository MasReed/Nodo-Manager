import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import { initializeItems } from './reducers/itemReducer'
import { initializeOrders } from './reducers/orderReducer'
import { initializeUsers } from './reducers/userReducer'

import ItemsPage from './components/items/ItemsPage'
import OrdersPage from './components/orders/OrdersPage'
import UsersPage from './components/users/UsersPage'
import HomePage from './components/HomePage'
import MenuPage from './components/menu/MenuPage'
import RegisterPage from './components/RegisterPage'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeItems())
      dispatch(initializeOrders())
      dispatch(initializeUsers())
  }, [ dispatch ])


  const navBtnStyle = {
    padding: '10px',
    margin: '10px 0'
  }

  return (
    <div>
      <React.Fragment>
        <nav style={navBtnStyle}>
          <Link to='/' style={navBtnStyle}>Home</Link>
          <Link to='/items' style={navBtnStyle}>Items</Link>
          <Link to='/menu' style={navBtnStyle}>Menu</Link>
          <Link to='/orders' style={navBtnStyle}>Orders</Link>
          <Link to='/users' style={navBtnStyle}>Users</Link>
          <Link to='/register' style={navBtnStyle}>Register</Link>
        </nav>
        <hr />
      </React.Fragment>

      <React.Fragment>
        <Switch>

          <Route path='/items'>
            <ItemsPage />
          </Route>

          <Route path='/menu'>
            <MenuPage />
          </Route>

          <Route path='/orders'>
            <OrdersPage />
          </Route>

          <Route path='/register'>
            <RegisterPage />
          </Route>

          <Route path='/users'>
            <UsersPage />
          </Route>

          <Route path='/'>
            <HomePage />
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
