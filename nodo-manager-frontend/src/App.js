import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Switch,
  Route
} from "react-router-dom";

import { initializeItems, resetItems } from './reducers/itemReducer'
import { initializeOrders, resetOrders } from './reducers/orderReducer'
import { initializeUsers, resetUsers } from './reducers/userReducer'

import HomePage from './components/login-register-landing/HomePage'
import ItemsPage from './components/items/ItemsPage'
import MenuPage from './components/menu/MenuPage'
import OrderConfirmationPage from './components/orders/OrderConfirmationPage'
import OrdersPage from './components/orders/OrdersPage'
import MyOrderPage from './components/orders/MyOrderPage'
import UsersPage from './components/users/UsersPage'
import AuthRoute from './components/site-wide/AuthRoute'
import ScrollToTop from './components/site-wide/ScrollToTop'
import SiteFooter from './components/site-wide/SiteFooter'
import SiteNavBar from './components/site-wide/SiteNavBar'

function App() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    dispatch(resetItems())
    dispatch(resetOrders())
    dispatch(resetUsers())
    dispatch(initializeItems())
    dispatch(initializeOrders())
    dispatch(initializeUsers())
  }, [ dispatch, currentUser ])

  return (
    <>
      <SiteNavBar />

      <div style={{ minHeight: 'calc(100vh - 200px)' }}>
        <ScrollToTop />
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

          <Route path='/order-confirmed'>
            <OrderConfirmationPage />
          </Route>

          <Route path='/orders'>
            <OrdersPage />
          </Route>

          <AuthRoute path='/users' authGroup='admin'>
            <UsersPage />
          </AuthRoute>

          <Route path='/'>
            <HomePage />
          </Route>

          <Route path="*">
            {<h2>Not Found</h2>}
          </Route>

        </Switch>
      </div>

      <SiteFooter />

    </>
  )
}

export default App;
