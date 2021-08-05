import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import LoginModal from './LoginModal'

import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const SiteNavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const currentUser = useSelector((state) => state.currentUser)

  const userRoles = useSelector((state) => ((state.currentUser && state.currentUser.role)
    ? state.currentUser.role.encompassedRoles
    : []))

  const authGroups = [
    'admin',
    'manager',
    'employee',
  ]

  return (
    <>
      <Navbar collapseOnSelect expand='lg' sticky='top' bg='warning' variant='light'>
        <Navbar.Brand as={Link} to='/'>Nodo-Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link eventKey='1' as={Link} to='/menu'>Menu</Nav.Link>
            { currentUser && <Nav.Link eventKey='2' as={Link} to='/my-account'>My Account</Nav.Link>}
            <Nav.Link eventKey='3' as={Link} to='/my-order'>My Order</Nav.Link>
          </Nav>

          {/* Conditionally render links, if user belongs to one of authGroups */}
          {
            authGroups.some((group) => userRoles.includes(group))
              ? (
                <Nav className='ml-auto border-right border-secondary'>
                  <Nav.Link eventKey='4' as={Link} to='/orders'>Orders</Nav.Link>
                  <Nav.Link eventKey='5' as={Link} to='/items'>Items</Nav.Link>
                  <Nav.Link eventKey='6' as={Link} to='/users'>Users</Nav.Link>
                </Nav>
              )
              : null
          }

          {/* Conditionally render login/logout button for the currentUser */}
          {
            currentUser
              ? (
                <>
                  <Navbar.Text className='px-2'>
                    <small>
                      {`Signed in as: ${currentUser.username}`}
                    </small>
                  </Navbar.Text>
                  <LogoutButton />
                </>
              )
              : <LoginButton setShow={setShowLoginModal} />
          }

        </Navbar.Collapse>
      </Navbar>

      {/* Modal Login Window */}
      <LoginModal show={showLoginModal} setShow={setShowLoginModal} />

    </>
  )
}

export default SiteNavBar
