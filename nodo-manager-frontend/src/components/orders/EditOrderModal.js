import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { updateOrderActionCreator } from '../../reducers/orderReducer'


const EditOrderModal = ({ order, show, setShow }) => {

  const dispatch = useDispatch()

  const [ form, setForm ] = useState({
    orderCategory: order.category,
    orderName: order.name,
    orderNotes: order.notes
  })
  const [ errors, setErrors ] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Remove any errors from the error object
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { orderCategory, orderName, orderNotes } = form
    const newErrors = {}
    // orderCategory errors
    if (!orderCategory) newErrors.orderCategory = 'Choose an order type.'

    // orderName errors
    if ( !orderName || orderName === '' ) newErrors.orderName = 'Enter a username!'
    else if ( orderName.length > 30 ) newErrors.orderName = 'Username is too long'
    else if ( orderName.length < 3 ) newErrors.orderName = 'Username is too short'

    // orderNotes errors
    if ( orderNotes.length > 150 ) newErrors.orderNotes = 'Notes are too long'

    return newErrors
  }

  const handleUpdateSubmission = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    }

    try {

      const updatedOrderObject = {
        ...order,
        category: form.orderCategory,
        name: form.orderName,
        notes: form.orderNotes
      }

      console.log('UPDATED ORDER OBJ', updatedOrderObject)

      await dispatch(
        updateOrderActionCreator(order._id, updatedOrderObject)
      )

      setForm({
        orderCategory: form.orderCategory,
        orderName: form.orderName,
        orderNotes: form.orderNotes
      })

      setShow(false)

    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  const handleModalClose = () => {
    setForm({
      orderCategory: order.category,
      orderName: order.name,
      orderNotes: order.notes
    })
    setErrors({})
    setShow(false)
  }

  return (
    <Modal
      show={show}
      onHide={ handleModalClose }
      dialogClassName='modal-60w'
      backdrop="static"
      keyboard={false}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit {order.name}'s Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='updateOrderForm' onSubmit={ handleUpdateSubmission }>
          <Form.Group>
            <ButtonGroup toggle>
              <ToggleButton
                type='radio'
                name='carry-out-toggle'
                variant='outline-primary'
                value={form.orderCategory}
                checked={form.orderCategory === 'Carry Out'}
                onChange={ () => setField('orderCategory', 'Carry Out') }
                isInvalid={ !!errors.orderCategory }
              >Carry Out
              </ToggleButton>

              <ToggleButton
                type='radio'
                name='delivery-toggle'
                variant='outline-primary'
                value={form.orderCategory}
                checked={form.orderCategory === 'Delivery'}
                onChange={ () => setField('orderCategory', 'Delivery') }
                isInvalid={ !!errors.orderCategory }
              >Delivery
              </ToggleButton>
            </ButtonGroup>
            <Form.Text>{form.orderCategory} selected.</Form.Text>
            <Form.Control.Feedback type='invalid'>{ errors.orderCategory }</Form.Control.Feedback>
          </Form.Group>

          <Form.Row className='ml-0 mr-0'>
            <Col lg='auto' className='pl-0'>
              <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  value={form.orderName}
                  onChange={ ({ target }) => setField('orderName', target.value) }
                  placeholder='e.g. Jane Doe'
                  isInvalid={ !!errors.orderName }
                />
                <Form.Control.Feedback type='invalid'>{ errors.orderName }</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col className='pr-0'>
              <Form.Group>
                <Form.Label>Order Notes:</Form.Label>
                <Form.Control
                  value={form.orderNotes}
                  onChange={ ({ target }) => setField('orderNotes', target.value) }
                  isInvalid={ !!errors.orderNotes }
                />
                <Form.Control.Feedback type='invalid'>{ errors.orderNotes }</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>

        <hr />

        {
          (order.items.length > 0) && order.items.map(item =>
            (
              <div key={item.uniqueId}>
                <div>
                  <div className='d-flex justify-content-between'>
                    <h2 className='my-0 py-2'>{item.baseName}</h2>
                    <h2 className='my-0 py-2 text-capitalize'>{item.whos}</h2>
                  </div>

                  <div className='my-0'>
                    <h6 className='my-0 pt-2 pb-1'>Ingredients:</h6>
                    <p className='my-0 px-4 py-0'>
                      {item.modIngredients.filter(obj =>
                        obj.checked).map(obj =>
                          obj.ingredient).join(', ')
                      }
                    </p>
                    <p className='my-0 px-4 py-0'>
                      <small>Exclusions:&nbsp;
                        {item.modIngredients.filter(obj =>
                          !obj.checked).map(obj =>
                            obj.ingredient).join(', ')
                        }
                      </small>
                    </p>
                    {
                      item.notes &&
                      <>
                        <h6 className='my-0 py-2'>Notes:</h6>
                        <p className='my-0 px-4 py-0'>{item.notes}</p>
                      </>
                    }
                  </div>

                  <p className='my-0 py-2'>Item Total: ${item.basePrice}</p>
                </div>
              </div>
            )
          )
        }

      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-between'>
          {/* Cancel */}
          <Button variant="outline-warning" onClick={ handleModalClose }>
            Cancel
          </Button>

          {/* Save */}
          <Button type='submit' form='updateOrderForm'>Save Updates</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default EditOrderModal
