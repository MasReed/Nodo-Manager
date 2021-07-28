import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import MenuCategoryAccordion from './MenuCategoryAccordion'
import CustomizeItemModal from './CustomizeItemModal'

const MenuPage = () => {
  const history = useHistory()

  // Array of unique item categories
  const categories = useSelector(
    (state) => [...new Set(state.items.map((item) => item.category))],
  )

  const [selectedItem, setSelectedItem] = useState({})
  const [showCustomize, setShowCustomize] = useState(false)

  return (
    <Container className='pt-5'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>Menu</h1>
        <Button onClick={() => history.push('/my-order')} variant='outline-secondary'>
          My Order
        </Button>
      </div>
      <hr />

      {
        categories.map((category) => (
          <MenuCategoryAccordion
            key={category}
            category={category}
            showCustomize={showCustomize}
            setShowCustomize={setShowCustomize}
            setSelectedItem={setSelectedItem}
          />
        ))
      }

      <CustomizeItemModal
        show={showCustomize}
        setShow={setShowCustomize}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

    </Container>
  )
}

export default MenuPage
