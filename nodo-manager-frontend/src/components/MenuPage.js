import React from 'react'
import { useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'


const MenuPage = () => {

  const menuItems = useSelector(state => state.items)

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#remove_duplicate_elements_from_the_array
  const categories = useSelector(state => [...new Set(state.items.map(item => item.category))])

  const customizeItem = () => {
    console.log('custimze with modal window')
  }

  return (
    <Container style={{ padding: '0' }}>
      <h2>Menu</h2>

      {
        categories.map(category => (
          <div key={category}>
            <div>
              <hr />
              <h4 className='mtb-4 text-muted'>{category}</h4>
              <hr />
            </div>

            <CardDeck>
              {menuItems.map(item => item.category === category
                ? <Card key={item._id} style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {item.name}
                    <span>${item.price}</span>
                  </Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>

                  <Card.Text>{item.description}</Card.Text>

                  <hr />

                  <Card.Subtitle className="mb-1 text-muted">Ingredients</Card.Subtitle>
                  <ListGroup variant="flush">
                    {(item.ingredients) && item.ingredients.map(ingredient => (
                      <ListGroup.Item
                        key={ingredient}
                        style={{ border: 'none', padding: '1px'}}
                      >- {ingredient}</ListGroup.Item>
                      ))
                    }
                  </ListGroup>

                  <hr />

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6 style={{ margin: '0', padding: '6px 0' }}>{item.availability}</h6>
                    {(item.availability === 'Available')
                      ? <Button onClick={ customizeItem }>Add to Order</Button>
                      : <Button disabled>Add to Order</Button>
                    }
                  </div>

                </Card.Body>
                  </Card>
                : null)}
              </CardDeck>
          </div>
          ))
      }

    </Container>
  )
}

export default MenuPage
