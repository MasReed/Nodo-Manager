import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { isVisible } from '../../reducers/modalReducer'
import truncateString from '../../utilities/truncateString'

const MenuItemCard = ({ item, setShowCustomize, setSelectedItem }) => {
  const dispatch = useDispatch()
  // call props to display customization modal
  const callCustomizeModal = async () => {
    setSelectedItem(item)
    setShowCustomize(true)
    await dispatch(isVisible(true))
  }

  return (
    <Card key={item._id} className='h-100'>

      {/* Item name, category, price, description */}
      <Card.Header className='m-0 py-3'>
        <Card.Title className='d-flex justify-content-between'>
          <Card.Text className='mb-0 mr-2 text-wrap text-break'>{item.name}</Card.Text>
          <Card.Text className='mb-0 ml-2'>{`$${item.price}`}</Card.Text>
        </Card.Title>

        <Card.Subtitle className='mb-2 text-muted'>
          {item.category}
        </Card.Subtitle>

        <Card.Text className='text-wrap text-break'>{item.description}</Card.Text>
      </Card.Header>

      {/* Item Image */}
      <Card.Body className='m-0 pt-3 pb-0'>
        <Card.Img src='/assets/burger.svg' />
        <hr className='mb-0' />
      </Card.Body>

      {/* Ingredients */}
      <Card.Body className='m-0 py-3'>
        <Card.Text className='m-0 p-0'>
          <u>Ingredients:</u>
        </Card.Text>

        <Card.Text className='m-0 p-0 text-wrap text-break'>
          {
            truncateString(item.ingredients.join(', '), 130)
          }
        </Card.Text>
      </Card.Body>

      {/* Item availability, Delete and Update Buttons */}
      <Card.Footer className='m-0 py-3'>
        <div className='d-flex justify-content-between'>
          <h6 className='m-0 py-auto align-self-center'>{item.availability}</h6>
          {
            (item.availability === 'Available')
              ? <Button onClick={callCustomizeModal}>Make it Yours</Button>
              : <Button disabled>Add to Order</Button>
          }
        </div>
      </Card.Footer>
    </Card>
  )
}

export default MenuItemCard
