import React from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const MenuItemCard = ({ item, show, setShow }) => {

  const customizeItem = () => {
    setShow(true)
  }

  const truncateIngredients = (str) => {
    return str.length > 130 ? str.substring(0, 131) + ' ...' : str
  }

  return (
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
  )
}

export default MenuItemCard
