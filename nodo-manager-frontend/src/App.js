import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Switch,
  Route
} from "react-router-dom";

import { initializeItems } from './reducers/itemReducer'
import { initializeOrders } from './reducers/orderReducer'
import { initializeUsers } from './reducers/userReducer'

import HomePage from './components/login-register-landing/HomePage'
import ItemsPage from './components/items/ItemsPage'
import MenuPage from './components/menu/MenuPage'
import OrdersPage from './components/orders/OrdersPage'
import MyOrderPage from './components/orders/MyOrderPage'
import UsersPage from './components/users/UsersPage'
import ScrollToTop from './components/site-wide/ScrollToTop'
import SiteFooter from './components/site-wide/SiteFooter'
import SiteNavBar from './components/site-wide/SiteNavBar'

function App() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
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

      <SiteFooter />

    </>
  )
}

export default App;
