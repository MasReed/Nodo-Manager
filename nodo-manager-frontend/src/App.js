import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'

import { initializeItems } from './reducers/itemReducer'
import { initializeOrders } from './reducers/orderReducer'
import { initializeUsers } from './reducers/userReducer'

import ItemsPage from './components/items/ItemsPage'
import OrdersPage from './components/orders/OrdersPage'
import UsersPage from './components/users/UsersPage'
import HomePage from './components/HomePage'
import MenuPage from './components/menu/MenuPage'
import MyOrderPage from './components/orders/MyOrderPage'


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
          </Nav>

          <Nav className='ml-auto'>
            <Nav.Link as={Link} to='/orders'>Orders</Nav.Link>
            <Nav.Link as={Link} to='/items'>Items</Nav.Link>
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div style={{ minHeight: 'calc(100vh - 200px)' }}>
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
      </div>

      <footer className='mt-5 p-5' style={{ backgroundColor: 'gray', height: '200px' }}>
        <Container>
          <Row>
            <Col>
              <h6>About</h6>
              <p>Words Here</p>
            </Col>

            <Col>
              <h6>Categories</h6>
              <p>Words Here</p>
            </Col>

            <Col>
              <h6>Quick Links</h6>
              <p>Words Here</p>
            </Col>
          </Row>
        </Container>
      </footer>

    </div>
  )
}

export default App;
