import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';

const PaymentModal = ({
  order, addOrder, show, setShow,
}) => {
  const history = useHistory();

  const handlePaymentSubmission = (event) => {
    event.preventDefault();
    setShow(false);
    // history.push('/order-confirmed')
    history.push('/orders');
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      dialogClassName="modal-60w"
      backdrop="static"
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Payment Options</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="paymentInfoForm" onSubmit={handlePaymentSubmission}>

          <Form.Group>
            <Form.Label>Payment Type</Form.Label>
            <ButtonGroup toggle>
              <ToggleButton
                type="radio"
                name="carry-out-toggle"
                variant="outline-primary"
                value={undefined}
                checked={false}
                onChange={() => console.log('btn changed')}
              >
                Option 1
              </ToggleButton>

              <ToggleButton
                type="radio"
                name="delivery-toggle"
                variant="outline-primary"
                value={undefined}
                checked
                onChange={() => console.log('btn 2 changed')}
              >
                Option 2
              </ToggleButton>
            </ButtonGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={undefined}
              onChange={({ target }) => console.log(target.value)}
            />
            <Form.Text>As it appears on card</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              value={undefined}
              onChange={({ target }) => console.log(target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>CCV</Form.Label>
            <Form.Control
              value={undefined}
              onChange={({ target }) => console.log(target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Expiration</Form.Label>
            <Form.Control
              value={undefined}
              onChange={({ target }) => console.log(target.value)}
            />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outline-warning"
          onClick={() => {
            console.log('implement cancel sequence');
            setShow(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="myOrderForm"
        >
          Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
