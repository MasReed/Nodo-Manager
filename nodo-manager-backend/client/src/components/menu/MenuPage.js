import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import MenuCategoryAccordion from './MenuCategoryAccordion'
import ItemCustomizationModal from './ItemCustomizationModal'

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

      {/* Dropdown accordions for each category */}
      {
        categories.map((category) => (
          <MenuCategoryAccordion
            key={category}
            category={category}
            setShowCustomize={setShowCustomize}
            setSelectedItem={setSelectedItem}
          />
        ))
      }

      {/* Item customization modal component */}
      <ItemCustomizationModal
        item={selectedItem}
        setItem={setSelectedItem}
        show={showCustomize}
        setShow={setShowCustomize}
      />

    </Container>
  )
}

export default MenuPage
