import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import cartReducer from './reducers/cartReducer'
import itemReducer from './reducers/itemReducer'
import orderReducer from './reducers/orderReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  cart: cartReducer,
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
