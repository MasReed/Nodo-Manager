import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'

import { addOrderActionCreator } from '../reducers/orderReducer'
const MenuPage = () => {
  const dispatch = useDispatch()
  const menuItems = useSelector(state => state.items)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#remove_duplicate_elements_from_the_array
  const categories = useSelector(state => [...new Set(state.items.map(item => item.category))])

  const [showMyOrder, setShowMyOrder] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [orderItems, setOrderItems] = useState([])

  const customizeItem = () => {
    console.log('custimze with modal window')
    setShowCustomize(true)
  }

  const addCustomItem = (event) => {
    event.preventDefault()
    setShowCustomize(false)
    setOrderItems([...orderItems, 'newItem'])
  }

  // Order action dispatchers
  const addOrder = (event) => {
    event.preventDefault()

    const orderObject = {
      foodItems: orderItems,
    }

    dispatch(addOrderActionCreator(orderObject))
    setShowMyOrder(false)
    setOrderItems([])
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
    <Container className='p-0'>
      <div className='m-0 p-0' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className='m-0 p-0'>Menu</h2>
        <Button onClick={() => setShowMyOrder(true)} variant='outline-secondary'>My Order</Button>
      </div>
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
                          ? <Col key={item._id} className='container-fluid mb-4 px-2'>
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

      <Modal
        show={showMyOrder}
        onHide={() => {
          setShowMyOrder(false)
          setOrderItems([])
        }}
        dialogClassName='modal-80w'
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            orderItems.map(item => <p key={item}>{item}</p>)
          }
        </Modal.Body>

        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outline-warning"
              onClick={ () => {
                setShowMyOrder(false)
                setOrderItems([])
              }}
            >Cancel</Button>
          <div>
            <Button onClick={() => setShowMyOrder(false) } style={{ margin: '0 10px'}} variant="outline-secondary">Add More</Button>
            <Button onClick={ addOrder } style={{ margin: '0 10px'}}>Checkout</Button>
          </div>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showCustomize}
        onHide={() => {
          setShowCustomize(false)
        }}
        dialogClassName='modal-60w'
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Customize</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          ADD FORM HERE
        </Modal.Body>

        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outline-warning"
              onClick={ () => {
                setShowCustomize(false)
              }}
            >Cancel</Button>
            <Button onClick={ addCustomItem } style={{ margin: '0 10px'}}>Add to Order</Button>
        </Modal.Footer>

      </Modal>

    </Container>
  )
}

export default MenuPage
