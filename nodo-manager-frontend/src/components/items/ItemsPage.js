import React from 'react'

import ItemsList from './ItemsList'
import NewItemForm from './NewItemForm'

const ItemsPage = () => {

  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Items Page</h2>
      <NewItemForm />
      <hr />
      <ItemsList />
    </div>
  )
}

export default ItemsPage
