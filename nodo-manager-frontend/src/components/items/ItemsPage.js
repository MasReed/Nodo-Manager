import React from 'react'
import { useDispatch } from 'react-redux'

import { addItemActionCreator } from '../../reducers/itemReducer'

import ItemsList from './ItemsList'

const ItemsPage = () => {

  const dispatch = useDispatch()

  // Item action dispatchers
  const addItem = (event) => {
    event.preventDefault()
    dispatch(addItemActionCreator(
      {
        name: 'SOME CONTENT',
        description: 'A test',
        category: 'testing',
        ingredients: ['bread']
      }
    ))
  }

  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Items Page</h2>
      <button onClick={ addItem }>ADD ITEM</button>
      <hr />
      <ItemsList />
    </div>
  )
}

export default ItemsPage
