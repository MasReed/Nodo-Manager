import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import ItemsList from './ItemsList'
import NewItemForm from './NewItemForm'

const ItemsPage = () => {

  const [show, setShow] = useState(false)

  return (
    <Container style={{ padding: '0' }}>
      <h2>Items Page</h2>

      <NewItemForm show={show} setShow={setShow}/>

      <Button onClick={ () => setShow(true) } variant='secondary'>Create</Button>

      <hr />
      <ItemsList />
    </Container>
  )
}

export default ItemsPage
