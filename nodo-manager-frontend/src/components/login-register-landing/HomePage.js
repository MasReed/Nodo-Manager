import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import { guestUserActionCreator } from '../../reducers/currentUserReducer'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const HomePage = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleGuest = () => {
    dispatch(guestUserActionCreator())
    history.push('/menu')
  }

  return (
    <Container className='pt-5'>
      <h1>Welcome!</h1>
      <hr />
      <Row>
        <Col className='p-5'>
          <h2>Login</h2>
          <hr />
          <LoginForm />
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
            <Button onClick={ handleGuest } className='btn-block'> > </Button>
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
