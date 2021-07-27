import React from 'react'
import { useSelector } from 'react-redux'

import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import ItemInfoCard from './ItemInfoCard'

const ItemList = ({ category }) => {
  const items = useSelector((state) => state.items)

  return (
    <Container>
      <CardDeck>

        {/* Items with matching 'category' are rendered */}
        {items.map((item) => (item.category === category
          ? (
            /* eslint-disable-next-line no-underscore-dangle */
            <Col key={item._id} className='container-fluid mb-4 px-2'>
              {/* eslint-disable-next-line no-underscore-dangle */}
              <ItemInfoCard key={item._id} item={item} />
            </Col>
          )
          : null))}

      </CardDeck>

      <hr />

    </Container>
  )
}

export default ItemList
