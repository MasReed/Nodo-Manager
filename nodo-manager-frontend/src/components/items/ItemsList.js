import React from 'react'
import { useSelector } from 'react-redux'

import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ItemInfo from './ItemInfo'


const ItemList = () => {

  const items = useSelector(state => state.items)

  return (
    <Container>
      <Row>
        <Col style={{ padding: '0' }}>
          <CardDeck>
            {
              items.map(item =>
                <ItemInfo key={item._id} item={item} />
              )
            }
          </CardDeck>
        </Col>
      </Row>
    </Container>
  )
}

export default ItemList
