import React, { useState } from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import RegisterForm from './RegisterForm'

import authServices from '../services/authentications'

const HomePage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('login called')
    console.log('username', username)
    console.log('pw', password)

    try {
      authServices.login(username, password)
    } catch (exception) {
      console.log(exception)
    } finally {
      setPassword('')
    }

    setUsername('')

  }

  return (
    <Container className='pt-5'>
      <h1>Welcome!</h1>
      <hr />
      <Row>
        <Col className='p-5'>
          <h2>Login</h2>
          <hr />

          <Form id='loginForm' onSubmit={ handleLogin }>
            <Form.Group controlId='loginUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                onChange={ ({ target }) => setUsername(target.value) }
              />
            </Form.Group>

            <Form.Group controlId='loginPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={ ({ target }) => setPassword(target.value) }
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
        </Col>

        <Col
          className='my-5 px-5 d-flex align-items-center'
          style={{
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderColor: 'rgba(0,0,0, 0.1)'
          }}
        >
          <div>
            <Button className='btn-block'> > </Button>
            <hr />
            <h2>Continue As Guest</h2>
          </div>
        </Col>

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
