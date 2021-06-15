import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  Switch,
  Route
} from "react-router-dom";

import { initializeItems } from './reducers/itemReducer'
import { initializeOrders } from './reducers/orderReducer'
import { initializeUsers } from './reducers/userReducer'

import ItemsPage from './components/items/ItemsPage'
import OrdersPage from './components/orders/OrdersPage'
import UsersPage from './components/users/UsersPage'
import HomePage from './components/HomePage'
import MenuPage from './components/menu/MenuPage'
import MyOrderPage from './components/orders/MyOrderPage'
import SiteFooter from './components/SiteFooter'
import SiteNavBar from './components/SiteNavBar'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeItems())
      dispatch(initializeOrders())
      dispatch(initializeUsers())
  }, [ dispatch ])

  return (
    <>
      <SiteNavBar />

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

      <SiteFooter />

    </>
  )
}

export default App;
