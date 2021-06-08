import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import ItemsList from './ItemsList'
import NewItemForm from './NewItemForm'

const ItemsPage = () => {

  const [showNewItemForm, setShowNewItemForm] = useState(false)

  return (
    <Container className='p-0'>

      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <h2 className='mb-0'>Items Page</h2>
        <Button onClick={ () => setShowNewItemForm(true) } variant='secondary'>
          Create
        </Button>
      </div>

      <NewItemForm show={showNewItemForm} setShow={setShowNewItemForm}/>

      <hr />
      <ItemsList />

    </Container>
  )
}

export default ItemsPage
