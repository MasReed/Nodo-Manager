import React from 'react'
import { useSelector } from 'react-redux'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ItemInfoCard from './ItemInfoCard'

const ItemList = ({ category }) => {
  const items = useSelector((state) => state.items)

  return (
    <Container>
      <Row xs={1} md={2} lg={2}>
        {/* Items with matching 'category' are rendered */}
        {items.map((item) => (item.category === category
          ? (
            <Col key={item._id} className='mx-0 mb-4'>
              <ItemInfoCard item={item} />
            </Col>

          )
          : null))}
      </Row>
      <hr />
    </Container>
  )
}

export default ItemList
