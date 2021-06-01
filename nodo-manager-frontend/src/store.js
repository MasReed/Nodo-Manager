import { createStore, combineReducers } from 'redux'
import itemReducer from './reducers/itemReducer'

const reducer = combineReducers({
  items: itemReducer
})

const store = createStore(reducer)

store.subscribe( () => {
  const storeNow = store.getState()
  console.log(storeNow)
})

export default store
