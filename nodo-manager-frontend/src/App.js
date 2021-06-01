import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { newItemActionCreator, updateItemActionCreator, destroyItemActionCreator } from './reducers/itemReducer'
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

  const updateItem = async (event, id) => {
    event.preventDefault()
    const itemWithUpdates = {
      name: 'U1',
      description: 'UPDATED0',
      category: 'testing',
      ingredients: ['updated']
    }
    const response = await itemService.update(id, itemWithUpdates)
    console.log('RESPONSE', response)
    dispatch(updateItemActionCreator(response._id, response))
  }

  const destroyItem = async (event, id) => {
    event.preventDefault()
    await itemService.destroy(id)
    dispatch(destroyItemActionCreator(id))
  }

  const id = '60b6a8c812760235bcfc56f8'

  return (
    <div>
    <button onClick={ addItem }>ADD ITEM</button>
    <button onClick={ (event) => updateItem(event, id) }>UPDATE</button>
    <button onClick={ (event) => destroyItem(event, id) }>DESTROY</button>
      {state.items && state.items.map(item => <ItemInfo key={item._id} item={item} />)}
    </div>
  );
}

export default App;
