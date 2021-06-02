import React from 'react'
import { useDispatch } from 'react-redux'

import {
  updateItemActionCreator,
  destroyItemActionCreator
} from '../../reducers/itemReducer'


const ItemInfo = ({ item }) => {

  const dispatch = useDispatch()

  const itemWithUpdates = {
    name: 'U1',
    description: 'UPDATED0',
    category: 'testing',
    ingredients: ['updated']
  }


  const updateItem = (id) => {
    dispatch(updateItemActionCreator(id, itemWithUpdates))
  }

  const deleteItem = (id) => {
    dispatch(destroyItemActionCreator(id))
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <button onClick={ () => deleteItem(item._id) }>DELETE</button>
      <button onClick={ () => updateItem(item._id) }>UPDATE</button>
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

export default ItemInfo
