import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import alertReducer from './reducers/alertReducer'
import cartReducer from './reducers/cartReducer'
import currentUserReducer from './reducers/currentUserReducer'
import itemReducer from './reducers/itemReducer'
import orderReducer from './reducers/orderReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  alert: alertReducer,
  cart: cartReducer,
  currentUser: currentUserReducer,
  items: itemReducer,
  orders: orderReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe( () => {
  const storeNow = store.getState()
  console.log('STORENOW', storeNow)
})

export default store
