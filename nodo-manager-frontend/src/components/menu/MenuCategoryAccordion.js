import React from 'react'
import { useSelector } from 'react-redux'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import MenuItemCard from './MenuItemCard'

import CustomAccordion from '../site-wide/CustomAccordion'

const MenuCategoryAccordion = ({
  category, showCustomize, setShowCustomize, setSelectedItem,
}) => {
  const menuItems = useSelector((state) => state.items)

  return (
    <CustomAccordion text={category}>
      <Container>
        <Row xs={1} md={2} lg={2}>
          {menuItems.map((item) => (item.category === category
            ? (
              <Col key={item._id} className='mx-0 mb-4'>
                <MenuItemCard
                  item={item}
                  show={showCustomize}
                  setShow={setShowCustomize}
                  setSelectedItem={setSelectedItem}
                />
              </Col>
            )
            : null))}
        </Row>
        <hr />
      </Container>
    </CustomAccordion>
  )
}

export default MenuCategoryAccordion
