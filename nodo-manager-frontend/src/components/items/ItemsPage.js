import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'

import ItemsList from './ItemsList'
import NewItemForm from './NewItemForm'

const ItemsPage = () => {

  const [show, setShow] = useState(false)

  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Items Page</h2>

      <NewItemForm show={show} setShow={setShow}/>

      <Button onClick={ () => setShow(true) } variant='secondary'>Create</Button>

      <hr />
      <ItemsList />
    </div>
  )
}

export default ItemsPage
