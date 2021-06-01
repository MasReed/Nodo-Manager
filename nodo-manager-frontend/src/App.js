import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { newItemActionCreator } from './reducers/itemReducer'
import itemService from './services/items'


const ItemInfo = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
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

function App() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect(() => {
      itemService
        .getAll()
        .then(items => items.map(item =>
          dispatch(newItemActionCreator(item))
        ))
  }, [ dispatch ])


  const addItem = async (event) => {
    event.preventDefault()
    const newContent = {
      name: 'SOME CONTENT',
      description: 'A test',
      category: 'testing',
      ingredients: ['bread']
    }
    const newItem = await itemService.create(newContent)
    dispatch(newItemActionCreator(newItem))
  }


  return (
    <div>
    <button onClick={ addItem }>DISPATCH</button>
      {state.items && state.items.map(item => <ItemInfo key={item._id} item={item} />)}
    </div>
  );
}

export default App;
