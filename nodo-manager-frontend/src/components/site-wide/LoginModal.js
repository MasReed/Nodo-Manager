import React from 'react'

import Modal from 'react-bootstrap/Modal'

import LoginForm from '../login-register-landing/LoginForm'

const LoginModal = ({ show, setShow }) => (
  <Modal
    show={show}
    onHide={() => setShow(false)}
    dialogClassName={window.screen.width < 576 ? '' : 'modal-20w mr-5'}
    fullscreen={window.screen.width < 576 ? 'below-sm-down' : ''}
    keyboard={false}
    scrollable
  >
    <Modal.Header closeButton>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <LoginForm setShow={setShow} />
    </Modal.Body>

    <Modal.Footer>
      <p>
        Not a member?
        <a href='/'> Register today!</a>
      </p>

    </Modal.Footer>
  </Modal>
)

export default LoginModal
