import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import itemReducer from './reducers/itemReducer'
import orderReducer from './reducers/orderReducer'

const reducer = combineReducers({
  items: itemReducer,
  orders: orderReducer
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
