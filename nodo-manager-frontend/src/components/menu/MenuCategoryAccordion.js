import React from 'react'
import { useSelector } from 'react-redux'

import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import MenuItemCard from './MenuItemCard'


const MenuCategoryAccordion = ({ category, showCustomize, setShowCustomize, setSelectedItem }) => {

  const menuItems = useSelector(state => state.items)

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);

    return (
      <div
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </div>
    );
  }

  return (
    <Accordion>
      <Card className='mb-2' style={{ border: 'hidden' }}>
          <CustomToggle eventKey="0">
            <h4 className='mtb-4 text-muted'>{category}</h4>
            <hr />
          </CustomToggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body className='p-0'>
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
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default MenuCategoryAccordion
