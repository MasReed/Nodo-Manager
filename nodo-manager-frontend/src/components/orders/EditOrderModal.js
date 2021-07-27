import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { toastAlertCreator } from '../../reducers/alertReducer';
import { updateOrderActionCreator } from '../../reducers/orderReducer';
import charactersRemaining from '../../utilities/charactersRemaining';

const EditOrderModal = ({ order, show, setShow }) => {
  const dispatch = useDispatch();

  const [localOrder, setLocalOrder] = useState(order);

  const [form, setForm] = useState({
    orderCategory: localOrder.category,
    orderName: localOrder.name,
    orderNotes: localOrder.notes,
  });
  const [errors, setErrors] = useState({});

  // Easy form customization
  const formConfig = {
    orderCategory: {
      isEmpty: { errorMessage: 'A Category is required.' },
    },
    orderName: {
      isEmpty: { errorMessage: 'An Order Name is required.' },
      minLength: { value: 3, errorMessage: 'Order Name is too short' },
      maxLength: { value: 30, errorMessage: 'Order Name is too long' },
    },
    orderNotes: {
      maxLength: { value: 150, errorMessage: 'Order Notes are too long' },
    },
  };

  //
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Remove any errors from the error object
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  //
  const findFormErrors = () => {
    const { orderCategory, orderName, orderNotes } = form;
    const newErrors = {};
    // orderCategory errors
    if (!orderCategory) {
      newErrors.orderCategory = formConfig.orderCategory.errorMessage;
    }

    // orderName errors
    if (!orderName || orderName === '') {
      newErrors.orderName = formConfig.orderName.isEmpty.errorMessage;
    } else if (orderName.length < formConfig.orderName.minLength.value) {
      newErrors.orderName = formConfig.orderName.minLength.errorMessage;
    } else if (orderName.length > formConfig.orderName.maxLength.value) {
      newErrors.orderName = formConfig.orderName.maxLength.errorMessage;
    }

    // orderNotes errors
    if (orderNotes.length > formConfig.orderNotes.maxLength.value) {
      newErrors.orderNotes = formConfig.orderNotes.maxLength.errorMessage;
    }

    return newErrors;
  };

  //
  const handleUpdateSubmission = async (event) => {
    event.preventDefault();

    const newErrors = findFormErrors();

    // Check for any form errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const updatedOrderObject = {
          ...localOrder,
          category: form.orderCategory,
          name: form.orderName,
          notes: form.orderNotes,
        };

        await dispatch(
          updateOrderActionCreator(order._id, updatedOrderObject),
        );

        setForm({
          orderCategory: form.orderCategory,
          orderName: form.orderName,
          orderNotes: form.orderNotes,
        });

        setShow(false);
      } catch (err) {
        await dispatch(toastAlertCreator(err));
      }
    }
  };

  //
  const deleteOrderItem = (id) => {
    setLocalOrder((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.uniqueId !== id),
    }));
  };

  //
  const handleModalClose = () => {
    setForm({
      orderCategory: order.category,
      orderName: order.name,
      orderNotes: order.notes,
    });
    setErrors({});
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      dialogClassName="modal-60w"
      backdrop="static"
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Editing
          {' '}
          {order.name}
          's Order
          <h6>
            ID:
            {order._id}
          </h6>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="updateOrderForm" onSubmit={handleUpdateSubmission}>

          {/* Order Category */}
          <Form.Group>
            <ButtonGroup toggle>
              <ToggleButton
                type="radio"
                name="carry-out-toggle"
                variant="outline-primary"
                value={form.orderCategory}
                checked={form.orderCategory === 'Carry Out'}
                onChange={() => setField('orderCategory', 'Carry Out')}
              >
                Carry Out
              </ToggleButton>

              <ToggleButton
                type="radio"
                name="delivery-toggle"
                variant="outline-primary"
                value={form.orderCategory}
                checked={form.orderCategory === 'Delivery'}
                onChange={() => setField('orderCategory', 'Delivery')}
              >
                Delivery
              </ToggleButton>
            </ButtonGroup>

            <Form.Text>
              {form.orderCategory}
              {' '}
              selected.
            </Form.Text>

            <Form.Control.Feedback type="invalid">
              { errors.orderCategory }
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Row className="ml-0 mr-0">
            {/* Order Name */}
            <Col lg="auto" className="pl-0">
              <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  value={form.orderName.trim()}
                  minLength={formConfig.orderName.minLength.value.toString()}
                  maxLength={formConfig.orderName.maxLength.value.toString()}
                  onChange={({ target }) => setField('orderName', target.value)}
                  placeholder="e.g. Jane Doe"
                  isInvalid={!!errors.orderName}
                />
                <Form.Text>
                  {charactersRemaining(
                    form.orderName, formConfig.orderName.maxLength.value,
                  )}
                </Form.Text>

                <Form.Control.Feedback type="invalid">
                  { errors.orderName }
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Order Notes */}
            <Col className="pr-0">
              <Form.Group>
                <Form.Label>Order Notes:</Form.Label>
                <Form.Control
                  value={form.orderNotes.trim()}
                  maxLength={formConfig.orderNotes.maxLength.value.toString()}
                  onChange={({ target }) => setField('orderNotes', target.value)}
                  isInvalid={!!errors.orderNotes}
                />
                <Form.Text>
                  {charactersRemaining(
                    form.orderNotes, formConfig.orderNotes.maxLength.value,
                  )}
                </Form.Text>

                <Form.Control.Feedback type="invalid">
                  { errors.orderNotes }
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

          </Form.Row>
        </Form>

        <hr />

        {
          (localOrder.items.length > 0) && localOrder.items.map((item) => (
            <div key={item.uniqueId}>
              <div>
                <div className="d-flex justify-content-between">
                  <h2 className="my-0 py-2">{item.baseName}</h2>
                  <h2 className="my-0 py-2 text-capitalize">{item.whos}</h2>
                </div>

                <div className="my-0">
                  <h6 className="my-0 pt-2 pb-1">Ingredients:</h6>
                  <p className="my-0 px-4 py-0">
                    {item.modIngredients.filter((obj) => obj.checked).map((obj) => obj.ingredient).join(', ')}
                  </p>
                  <p className="my-0 px-4 py-0">
                    <small>
                      Exclusions:&nbsp;
                      {item.modIngredients.filter((obj) => !obj.checked).map((obj) => obj.ingredient).join(', ')}
                    </small>
                  </p>
                  {
                      item.notes
                      && (
                      <>
                        <h6 className="my-0 py-2">Notes:</h6>
                        <p className="my-0 px-4 py-0">{item.notes}</p>
                      </>
                      )
                    }
                </div>

                <div className="d-flex justify-content-between">
                  <div className="my-auto">
                    <Button
                      onClick={() => deleteOrderItem(item.uniqueId)}
                      variant="outline-danger"
                      size="sm"
                      style={{ border: 'hidden' }}
                    >
                      Remove Item
                    </Button>

                    <Button
                      onClick={() => console.log('edit called')}
                      variant="outline-secondary"
                      size="sm"
                      style={{ border: 'hidden' }}
                    >
                      Edit
                    </Button>
                  </div>
                  <p className="my-0 py-2">
                    Item Total: $
                    {item.basePrice}
                  </p>
                </div>
              </div>
            </div>
          ))
        }

      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        {/* Cancel */}
        <Button variant="outline-warning" onClick={handleModalClose}>
          Cancel
        </Button>

        {/* Save */}
        <Button type="submit" form="updateOrderForm">Save Updates</Button>
      </Modal.Footer>

    </Modal>
  );
};

export default EditOrderModal;
