import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { addOrderActionCreator } from '../../reducers/orderReducer'
import { resetCart } from '../../reducers/cartReducer'
import charactersRemaining from '../../utilities/charactersRemaining'


const MyOrderForm = ({ costs }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const cartItems = useSelector(state => state.cart)
  const currentUser = useSelector(state => state.currentUser)

  const getInitialDefaultOrderName = () => {
    const itemWhosIndex = cartItems.findIndex(elem => elem.whos !== '')

    if (currentUser){
      return currentUser.name

    } else if (itemWhosIndex !== -1) {
      return cartItems[itemWhosIndex].whos
    }
    return ''
  }

  const [ form, setForm ] = useState({
    orderCategory: 'Carry Out',
    orderName: getInitialDefaultOrderName(),
    orderNotes: ''
  })

  const [ errors, setErrors ] = useState({})

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
  }

  //
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

  //
  const findFormErrors = () => {
    const { orderCategory, orderName, orderNotes } = form
    const newErrors = {}
    // orderCategory errors
    if (!orderCategory) {
      newErrors.orderCategory = formConfig.orderCategory.errorMessage
    }

    // orderName errors
    if ( !orderName || orderName === '' ) {
      newErrors.orderName = formConfig.orderName.isEmpty.errorMessage
    } else if ( orderName.length < formConfig.orderName.minLength.value ) {
      newErrors.orderName = formConfig.orderName.minLength.errorMessage
    } else if ( orderName.length > formConfig.orderName.maxLength.value ) {
      newErrors.orderName = formConfig.orderName.maxLength.errorMessage
    }

    // orderNotes errors
    if ( orderNotes.length > formConfig.orderNotes.maxLength.value ) {
      newErrors.orderNotes = formConfig.orderNotes.maxLength.errorMessage
    }

    return newErrors
  }

  const addOrder = async (event) => {
    event.preventDefault()

    const newErrors = findFormErrors()

    // Check for any form errors
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    }

    if (cartItems.length > 0) {

      try {
        const orderObject = {
          category: form.orderCategory,
          items: cartItems,
          name: form.orderName,
          notes: form.orderNotes,
          costs: {
            subTotal: costs.subTotal,
            taxRate: costs.taxRate,
            taxAmount: costs.taxAmount,
            total: costs.total
          }
        }

        await dispatch(addOrderActionCreator(orderObject))
        await dispatch(resetCart())
        history.push('/order-confirmed')

      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }

    } else {
      await dispatch(toastAlertCreator('No items in order!'))
      history.push('/menu')
    }
  }

  return (
    <Form id='myOrderForm' onSubmit={ addOrder }>
      {/* Order Category */}
      <Form.Group>
        <ButtonGroup toggle>
          <ToggleButton
            type='radio'
            name='carry-out-toggle'
            variant='outline-primary'
            value={form.orderCategory}
            checked={form.orderCategory === 'Carry Out'}
            onChange={ () => setField('orderCategory', 'Carry Out') }
          >Carry Out
          </ToggleButton>

          <ToggleButton
            type='radio'
            name='delivery-toggle'
            variant='outline-primary'
            value={form.orderCategory}
            checked={form.orderCategory === 'Delivery'}
            onChange={ () => setField('orderCategory', 'Delivery') }
          >Delivery
          </ToggleButton>
        </ButtonGroup>

        <Form.Text>{form.orderCategory} selected.</Form.Text>

        <Form.Control.Feedback type='invalid'>
          { errors.orderCategory }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Row className='ml-0 mr-0'>
        <Col lg='auto' className='pl-0'>

          {/* Order Name */}
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              value={form.orderName.trim()}
              minLength={formConfig.orderName.minLength.value.toString()}
              maxLength={formConfig.orderName.maxLength.value.toString()}
              onChange={ ({ target }) => setField('orderName', target.value) }
              placeholder='e.g. Jane Doe'
              isInvalid={ !!errors.orderName }
            />
            <Form.Text>
              {charactersRemaining(
                form.orderName, formConfig.orderName.maxLength.value
              )}
            </Form.Text>

            <Form.Control.Feedback type='invalid'>
              { errors.orderName }
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col className='pr-0'>

          {/* Order Notes */}
          <Form.Group>
            <Form.Label>Order Notes:</Form.Label>
            <Form.Control
              value={form.orderNotes.trim()}
              maxLength={formConfig.orderNotes.maxLength.value.toString()}
              onChange={ ({ target }) => setField('orderNotes', target.value) }
              isInvalid={ !!errors.orderNotes }
            />
            <Form.Text>
              {charactersRemaining(
                form.orderNotes, formConfig.orderNotes.maxLength.value
              )}
            </Form.Text>

            <Form.Control.Feedback type='invalid'>
              { errors.orderNotes }
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  )
}

export default MyOrderForm
