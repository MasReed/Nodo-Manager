import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import ItemsList from './ItemsList'
import NewItemForm from './NewItemForm'

const ItemsPage = () => {

  const [showNewItemForm, setShowNewItemForm] = useState(false)

  return (
    <Container className='pt-5'>

      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>Items Page</h1>
        <Button onClick={ () => setShowNewItemForm(true) } variant='outline-secondary'>
          CREATE
        </Button>
      </div>

      {/* Modal Form Component */}
      <NewItemForm show={showNewItemForm} setShow={setShowNewItemForm}/>

      <hr />
      
      <ItemsList />

    </Container>
  )
}

export default ItemsPage
