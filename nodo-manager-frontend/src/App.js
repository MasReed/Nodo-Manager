import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { initializeItems } from './reducers/itemReducer'
import { initializeOrders } from './reducers/orderReducer'
import { initializeUsers } from './reducers/userReducer'

import ItemsPage from './components/items/ItemsPage'
import OrdersPage from './components/orders/OrdersPage'
import UsersPage from './components/users/UsersPage'
import HomePage from './components/HomePage'
import MenuPage from './components/menu/MenuPage'
import RegisterPage from './components/RegisterPage'
import MyOrderPage from './components/myOrder/MyOrderPage'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeItems())
      dispatch(initializeOrders())
      dispatch(initializeUsers())
  }, [ dispatch ])

  return (
    <div>

      <Navbar bg="light" expand="lg" sticky='top'>
        <Navbar.Brand as={Link} to='/'>Nodo-Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/menu'>Menu</Nav.Link>
            <Nav.Link as={Link} to='/my-order'>My Order</Nav.Link>
            <Nav.Link as={Link} to='/register'>Register</Nav.Link>

          </Nav>
          <Nav className='ml-auto'>
            <Nav.Link as={Link} to='/orders'>Orders</Nav.Link>
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <React.Fragment>
        <Switch>

          <Route path='/items'>
            <ItemsPage />
          </Route>

          <Route path='/menu'>
            <MenuPage />
          </Route>

          <Route path='/my-order'>
            <MyOrderPage />
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
