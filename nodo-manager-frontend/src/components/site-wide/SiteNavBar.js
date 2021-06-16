import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import LogoutButton from './LogoutButton'

const SiteNavBar = () => {

  const currentUser = useSelector(state => state.currentUser)

  return (
    <Navbar expand="lg" sticky='top' bg='warning' variant='light'>
      <Navbar.Brand as={Link} to='/'>Nodo-Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/menu'>Menu</Nav.Link>
          <Nav.Link as={Link} to='/my-order'>My Order</Nav.Link>
        </Nav>

        <Nav className='ml-auto border-right border-secondary'>
          <Nav.Link as={Link} to='/orders'>Orders</Nav.Link>
          <Nav.Link as={Link} to='/items'>Items</Nav.Link>
          <Nav.Link as={Link} to='/users'>Users</Nav.Link>
        </Nav>

        {
          currentUser
          ? <>
            <Navbar.Text className='px-2'>
              <small>Signed in as: {currentUser.username}</small>
            </Navbar.Text>
            <LogoutButton />
          </>
          : null
        }

      </Navbar.Collapse>
    </Navbar>
  )
}

export default SiteNavBar
