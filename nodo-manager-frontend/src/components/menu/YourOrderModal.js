import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { addOrderActionCreator } from '../../reducers/orderReducer'

const YourOrderModal = ({ show, setShow, orderItems, setOrderItems }) => {

  const dispatch = useDispatch()

  const [orderName, setOrderName] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [orderCategory, setOrderCategory] = useState('Carry Out')

  const addOrder = (event) => {
    event.preventDefault()

    // subTotal: 9.5
    // taxAmount: 0.75
    // taxRate: 0.07
    // total: 10.25

    console.log('ORDER ITEMS', orderItems)

    const orderObject = {
      category: orderCategory,
      items: orderItems,
      name: orderName,
      notes: orderNotes,
      subTotal: 2.01,
      taxRate: 0.07,
      taxAmount: 1.23,
      total: 4.00
    }

    dispatch(addOrderActionCreator(orderObject))
    setShow(false)
    setOrderItems([])
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      dialogClassName='modal-70w'
      backdrop="static"
      keyboard={false}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form id='yourOrderForm' onSubmit={ addOrder }>
          <Form.Group>
            <ButtonGroup toggle>
              <ToggleButton
                type='radio'
                name='carry-out-toggle'
                variant='outline-primary'
                value={orderCategory}
                checked={orderCategory === 'Carry Out'}
                onChange={ () => setOrderCategory('Carry Out') }
              >Carry Out
              </ToggleButton>

              <ToggleButton
                type='radio'
                name='delivery-toggle'
                variant='outline-primary'
                value={orderCategory}
                checked={orderCategory === 'Delivery'}
                onChange={ () => setOrderCategory('Delivery') }
              >Delivery
              </ToggleButton>
            </ButtonGroup>
            <Form.Text>{orderCategory} selected.</Form.Text>
          </Form.Group>

          <Form.Row className='ml-0 mr-0'>
            <Col lg='auto' className='pl-0'>
              <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  value={orderName}
                  onChange={ ({ target }) => setOrderName(target.value) }
                  placeholder='e.g. Jane Doe'
                />
              </Form.Group>
            </Col>

            <Col className='pr-0'>
              <Form.Group>
                <Form.Label>Order Notes:</Form.Label>
                <Form.Control
                  value={orderNotes}
                  onChange={ ({ target }) => setOrderNotes(target.value) }
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>

        <hr />
        {
          orderItems.map(item =>
            (
              <>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2 className='my-0 py-2'>{item.baseName}</h2>
                    <h2 className='my-0 py-2 text-capitalize'>{item.whos}</h2>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    </div>

                    <div className='align-self-end'>
                      <p className='my-0 py-2'>base price: {item.basePrice}</p>
                      <hr style={{ margin: '2px 0px'}} />
                    </div>

                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h6 className='my-0 py-2'>Notes: {item.notes}</h6>
                    <p className='my-0 py-2'>Item Total: {item.subTotal}</p>
                  </div>

                  <div>
                    <Button onClick={ () => console.log('deleteItem') } variant='outline-danger' size='sm' style={{ border: 'hidden', marginTop: '8px'}}>Remove</Button>
                    <Button onClick={ () => console.log('updateItem') } variant='outline-secondary' size='sm' style={{ border: 'hidden', marginTop: '8px'}}>Edit</Button>
                  </div>

                </div>
                <hr />
              </>
            )
          )
        }

      </Modal.Body>

      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outline-warning"
            onClick={ () => {
              setShow(false)
              setOrderItems([])
            }}
          >Cancel</Button>
        <div>
          <Button onClick={() => setShow(false) } style={{ margin: '0 10px'}} variant="outline-secondary">Add More</Button>
          <Button type='submit' form='yourOrderForm' style={{ margin: '0 10px'}}>Checkout</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default YourOrderModal
