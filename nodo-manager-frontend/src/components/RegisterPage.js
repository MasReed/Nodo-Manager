import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const RegisterPage = () => {


  return (
    <div style={{ margin: '1% 20%'}}>
      <h2>Register Today!</h2>
      <hr />

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default RegisterPage
