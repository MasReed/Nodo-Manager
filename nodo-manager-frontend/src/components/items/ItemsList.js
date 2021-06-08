import React from 'react'
import { useSelector } from 'react-redux'

import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ItemInfo from './ItemInfo'


const ItemList = () => {

  const itemsAsComponents = useSelector(
    state => state.items.map(item =>
      <ItemInfo key={item._id} item={item} />
    )
  )

  return (
    <Container>
      <CardDeck>{itemsAsComponents}</CardDeck>
    </Container>
  )
}

export default ItemList
