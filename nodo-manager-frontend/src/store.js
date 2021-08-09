import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import alertReducer from './reducers/alertReducer'
import currentOrderReducer from './reducers/currentOrderReducer'
import currentUserReducer from './reducers/currentUserReducer'
import itemReducer from './reducers/itemReducer'
import modalReducer from './reducers/modalReducer'
import orderReducer from './reducers/orderReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  alert: alertReducer,
  currentOrder: currentOrderReducer,
  currentUser: currentUserReducer,
  items: itemReducer,
  modalOpen: modalReducer,
  orders: orderReducer,
  users: userReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
)

if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    const storeNow = store.getState()
    console.log('STORENOW', storeNow)
  })
}

export default store
