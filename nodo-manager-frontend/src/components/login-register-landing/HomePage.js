import React from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import GuestOption from './GuestOption'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const HomePage = () => {

  return (
    <Container className='pt-5'>
      <h1>Welcome!</h1>
      <hr />

      <Row>
        {/* User Login */}
        <Col className='p-5'>
          <h2>Login</h2>
          <hr />
          <LoginForm />
        </Col>

        {/* Guest Login */}
        <Col
          className='my-5 px-5 d-flex align-items-center text-center'
          style={{
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderColor: 'rgba(0,0,0, 0.1)'
          }}
        >
          <GuestOption />
        </Col>

        {/* Registration Form */}
        <Col className='p-5'>
          <h2>Register Today!</h2>
          <hr />
          <RegisterForm />
        </Col>

      </Row>
    </Container>
  )
}

export default HomePage
