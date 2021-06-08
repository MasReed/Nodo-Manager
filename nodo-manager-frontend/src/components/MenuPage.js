import React from 'react'
import { useSelector } from 'react-redux'

import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const MenuPage = () => {

  const menuItems = useSelector(state => state.items)

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#remove_duplicate_elements_from_the_array
  const categories = useSelector(state => [...new Set(state.items.map(item => item.category))])

  const customizeItem = () => {
    console.log('custimze with modal window')
  }

  const truncateIngredients = (str) => {
    return str.length > 130 ? str.substring(0, 131) + ' ...' : str
  }

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
    <Container style={{ padding: '0' }}>
      <h2>Menu</h2>
      <hr />

      {
        categories.map(category => (
          <div key={category}>

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
                          ? <Col className='container-fluid mb-4 px-2'>
                            <Card key={item._id}
                                className='mx-0 my-0'
                                style={{
                                  height: '32rem',
                                  minWidth: '18rem',
                                  maxWidth: '35rem'
                                }}
                            >

                              <Card.Header style={{height: '12rem'}}>
                                <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  {item.name}
                                  <span>${item.price}</span>
                                </Card.Title>

                                <Card.Subtitle className="mb-2 text-muted">
                                  {item.category}
                                </Card.Subtitle>

                                <Card.Text>{item.description}</Card.Text>
                              </Card.Header>

                              <Card.Body>
                                <Card.Img variant='top' src='/assets/burger.svg' height='55%'/>
                                <hr />

                                <Card.Text className='mb-0'>
                                  <u>Ingredients:</u>
                                </Card.Text>

                                <Card.Text>
                                  {
                                    truncateIngredients(item.ingredients.join(', '))
                                  }
                                </Card.Text>
                              </Card.Body>

                              <Card.Footer>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <h6 style={{ margin: '0', padding: '6px 0' }}>{item.availability}</h6>
                                  {(item.availability === 'Available')
                                    ? <Button onClick={ customizeItem }>Add to Order</Button>
                                    : <Button disabled>Add to Order</Button>
                                  }
                                </div>
                              </Card.Footer>
                            </Card>
                          </Col>
                          : null)}
                      </CardDeck>
                      <hr />
                    </Container>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          ))
      }

    </Container>
  )
}

export default MenuPage
