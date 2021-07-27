import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Switch,
  Route,
} from 'react-router-dom'

import { toastAlertCreator } from './reducers/alertReducer'
import { initializeItems } from './reducers/itemReducer'
import { resetOrders } from './reducers/orderReducer'
import { resetUsers } from './reducers/userReducer'

import HomePage from './components/login-register-landing/HomePage'
import ItemsPage from './components/items/ItemsPage'
import MenuPage from './components/menu/MenuPage'
import OrderConfirmationPage from './components/orders/OrderConfirmationPage'
import OrdersPage from './components/orders/OrdersPage'
import MyOrderPage from './components/orders/MyOrderPage'
import MyAccountPage from './components/users/MyAccountPage'
import UsersPage from './components/users/UsersPage'
import AlertBanner from './components/site-wide/AlertBanner'
import AuthRoute from './components/site-wide/AuthRoute'
import ScrollToTop from './components/site-wide/ScrollToTop'
import SiteFooter from './components/site-wide/SiteFooter'
import SiteNavBar from './components/site-wide/SiteNavBar'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  useEffect(() => {
    const resets = async () => {
      await dispatch(resetOrders())
      await dispatch(resetUsers())
    }

    const inits = async () => {
      await dispatch(initializeItems())
    }

    const onErr = async (err) => {
      await dispatch(toastAlertCreator(err))
    }

    try {
      resets()
      inits()
    } catch (err) {
      onErr(err)
    }
  }, [dispatch, currentUser])

  return (
    <>
      <SiteNavBar />
      <AlertBanner />

      <div style={{ minHeight: 'calc(100vh - 200px)' }}>
        <ScrollToTop />
        <Switch>

          <AuthRoute path='/items' authGroup='employee'>
            <ItemsPage />
          </AuthRoute>

          <Route path='/menu'>
            <MenuPage />
          </Route>

          <Route path='/my-order'>
            <MyOrderPage />
          </Route>

          <Route path='/order-confirmed'>
            <OrderConfirmationPage />
          </Route>

          <AuthRoute path='/orders' authGroup='employee'>
            <OrdersPage />
          </AuthRoute>

          <AuthRoute path='/my-account' authGroup='user'>
            <MyAccountPage />
          </AuthRoute>

          <AuthRoute path='/users' authGroup='employee'>
            <UsersPage />
          </AuthRoute>

          <Route path='/'>
            <HomePage />
          </Route>

          <Route path='*'>
            <h2>Not Found</h2>
          </Route>

        </Switch>
      </div>

      <SiteFooter />
    </>
  )
}

export default App
