import React from 'react'

import Modal from 'react-bootstrap/Modal'

import LoginForm from '../login-register-landing/LoginForm'
import useWindowSize from '../../hooks/useWindowSize'

const LoginModal = ({ show, setShow }) => {
  const windowSize = useWindowSize()

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className='p-0'
      dialogClassName={windowSize.width < 576 ? '' : 'modal-20w mr-5'}
      fullscreen={windowSize.width < 576 ? 'below-sm-down' : ''}
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
}

export default LoginModal
