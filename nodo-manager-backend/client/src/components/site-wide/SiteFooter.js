import React from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'

const SiteFooter = () => (
  <footer className='mt-5 p-5' style={{ backgroundColor: '#ff5959', height: '200px' }}>
    <Container>
      <Row>

        <Col>
          <h6>Quick Links</h6>
          <Nav className='flex-column'>
            <Nav.Link as={Link} to='/' className='p-0 text-light'>Home</Nav.Link>
            <Nav.Link as={Link} to='/menu' className='p-0 text-light'>Menu</Nav.Link>
            <Nav.Link as={Link} to='/my-order' className='p-0 text-light'>My Order</Nav.Link>
          </Nav>
        </Col>

        <Col>
          <h6>Admin Links</h6>
          <Nav className='flex-column'>
            <Nav.Link as={Link} to='/orders' className='p-0 text-light'>Orders</Nav.Link>
            <Nav.Link as={Link} to='/items' className='p-0 text-light'>Items</Nav.Link>
            <Nav.Link as={Link} to='/users' className='p-0 text-light'>Users</Nav.Link>
          </Nav>
        </Col>

        <Col>
          <h6>About</h6>
          <p className='text-light'>Words Here</p>
        </Col>

      </Row>
    </Container>
  </footer>
)

export default SiteFooter
