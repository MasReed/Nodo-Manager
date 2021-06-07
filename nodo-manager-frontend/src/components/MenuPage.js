import React from 'react'
import { useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'

const MenuPage = () => {

  const menuItems = useSelector(state => state.items.filter(item =>
    item.availability === 'Available' ? item : null
  ))

  console.log('MENU ITEMS', menuItems)

  return (
    <Container style={{ padding: '0' }}>
      <h2>Menu</h2>
      {
        menuItems.map(item => <li>{item.name}</li>)
      }
    </Container>
  )
}

export default MenuPage
