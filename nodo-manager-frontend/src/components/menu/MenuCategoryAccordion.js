import React from 'react'
import { useSelector } from 'react-redux'

import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import MenuItemCard from './MenuItemCard'

import CustomAccordion from '../site-wide/CustomAccordion'

const MenuCategoryAccordion = ({ category, showCustomize, setShowCustomize, setSelectedItem }) => {

  const menuItems = useSelector(state => state.items)

  return (
    <CustomAccordion text={category}>
      <Container>
        <CardDeck>
          {menuItems.map(item => item.category === category
            ? <Col key={item._id} className='container-fluid mb-4 px-2'>
              <MenuItemCard
                item={item}
                show={showCustomize}
                setShow={setShowCustomize}
                setSelectedItem={setSelectedItem}
              />
            </Col>
            : null)
          }
        </CardDeck>
        <hr />
      </Container>
    </CustomAccordion>
  )
}

export default MenuCategoryAccordion
