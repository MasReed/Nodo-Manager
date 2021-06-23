import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import LoginForm from '../login-register-landing/LoginForm'

import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'


const SiteNavBar = () => {

  const [showLoginModal, setShowLoginModal] = useState(false)

  const currentUser = useSelector(state => state.currentUser)

  const userRoles = useSelector(state =>
    (state.currentUser && state.currentUser.role)
    ? state.currentUser.role.encompassedRoles
    : []
  )

  const authGroups = [
    'admin',
    'manager',
    'employee'
  ]

  return (
    <>
      <Navbar expand="lg" sticky='top' bg='warning' variant='light'>
        <Navbar.Brand as={Link} to='/'>Nodo-Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/menu'>Menu</Nav.Link>
            { currentUser && <Nav.Link as={Link} to='/my-account'>My Account</Nav.Link>}
            <Nav.Link as={Link} to='/my-order'>My Order</Nav.Link>
          </Nav>

          {/*Conditionally render links, if user belongs to one of authGroups */}
          {
            authGroups.some(group => userRoles.includes(group))
            ? <Nav className='ml-auto border-right border-secondary'>
              <Nav.Link as={Link} to='/orders'>Orders</Nav.Link>
              <Nav.Link as={Link} to='/items'>Items</Nav.Link>
              <Nav.Link as={Link} to='/users'>Users</Nav.Link>
            </Nav>
            : null
          }

          {/*Conditionally render login/logout button for the currentUser */}
          {
            currentUser
            ? <>
              <Navbar.Text className='px-2'>
                <small>Signed in as: {currentUser.username}</small>
              </Navbar.Text>
              <LogoutButton />
            </>
            : <LoginButton show={showLoginModal} setShow={setShowLoginModal} />
          }

        </Navbar.Collapse>
      </Navbar>

      <Modal
        show={showLoginModal}
        onHide={() => {
          setShowLoginModal(false)
        }}
        dialogClassName='modal-20w mr-5'
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginForm setShow={setShowLoginModal} />
        </Modal.Body>

        <Modal.Footer>
          <p>Not a member? <a href='/'>Register today!</a></p>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SiteNavBar
