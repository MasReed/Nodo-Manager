import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'

import MenuHeader from './MenuHeader'
import MenuCategoryAccordion from './MenuCategoryAccordion'
import YourOrderModal from './YourOrderModal'
import CustomizeItemModal from './CustomizeItemModal'


const MenuPage = () => {

  const categories = useSelector(state =>
    [...new Set(state.items.map(item => item.category))]
  )

  const [showMyOrder, setShowMyOrder] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [showCustomize, setShowCustomize] = useState(false)


  return (
    <Container className='pt-5'>
      <MenuHeader show={showMyOrder} setShow={setShowMyOrder} />
      <hr />

      {
        categories.map(category => (
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
//
// <YourOrderModal
//   show={showMyOrder}
//   setShow={setShowMyOrder}
// />
