import React from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const HomePage = () => {

  return (
    <Container className='pt-5'>
      <h1>Welcome!</h1>
      <hr />
      <Row>
        <Col className='px-5 py-5'>
          <h2>Login</h2>
          <hr />

          <Form controlId='loginForm'>
            <Form.Group controlId='loginUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='email' placeholder='Username' />
            </Form.Group>

            <Form.Group controlId='loginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
        </Col>

        <Col style={{ borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'rgba(0,0,0, 0.1)' }}>
        </Col>

        <Col className='px-5 py-5'>
          <h2>Register Today!</h2>
          <hr />

          <Form>
            <Form.Group controlId='signupEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group controlId='signupUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='email' placeholder='Username' />
            </Form.Group>

            <Form.Group controlId='signupPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Form.Group controlId='signupPasswordVerify'>
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
