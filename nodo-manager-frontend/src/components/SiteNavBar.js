import React from 'react'

import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const SiteNavBar = () => {
  return (
    <Navbar expand="lg" sticky='top' bg='warning' variant='light'>
      <Navbar.Brand as={Link} to='/'>Nodo-Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/menu'>Menu</Nav.Link>
          <Nav.Link as={Link} to='/my-order'>My Order</Nav.Link>
        </Nav>

        <Nav className='ml-auto'>
          <Nav.Link as={Link} to='/orders'>Orders</Nav.Link>
          <Nav.Link as={Link} to='/items'>Items</Nav.Link>
          <Nav.Link as={Link} to='/users'>Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SiteNavBar
