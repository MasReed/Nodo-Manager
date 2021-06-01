import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  initializeItems,
  addItemActionCreator,
  updateItemActionCreator,
  destroyItemActionCreator
} from './reducers/itemReducer'



function App() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect(() => {
      dispatch(initializeItems())
  }, [ dispatch ])


  //TEMP Data
  const id = '60b6bc7812760235bcfc56ff'
  const newContent = {
    name: 'SOME CONTENT',
    description: 'A test',
    category: 'testing',
    ingredients: ['bread']
  }
  const itemWithUpdates = {
    name: 'U1',
    description: 'UPDATED0',
    category: 'testing',
    ingredients: ['updated']
  }

  const addItem = (event) => {
    event.preventDefault()
    dispatch(addItemActionCreator(newContent))
  }

  const updateItem = (event) => {
    event.preventDefault()
    dispatch(updateItemActionCreator(id, itemWithUpdates))
  }

  const deleteItem = (id) => {
    console.log('deleteitemCalled', id)
    dispatch(destroyItemActionCreator(id))
  }


  const ItemInfo = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <button onClick={ () => deleteItem(item._id) }>DESTROY</button>
        <h4>{item.description}</h4>
        <p>{item.category}</p>
        <ul>
          {(item.ingredients) && item.ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))
          }
        </ul>
      </div>
    )
  }

  return (
    <div>
      <button onClick={ addItem }>ADD ITEM</button>
      <button onClick={ updateItem }>UPDATE</button>
      <button onClick={ deleteItem }>DESTROY</button>
      {state.items && state.items.map(item => <ItemInfo key={item._id} item={item} />)}
    </div>
  );
}

export default App;
