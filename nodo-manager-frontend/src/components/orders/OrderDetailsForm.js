import React from 'react'
import { useDispatch } from 'react-redux'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { orderForms } from '../../configurations/formConfigs'
import { setOrderName } from '../../reducers/currentOrderReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const OrderDetailsForm = ({ form, setForm, errors }) => {
  const dispatch = useDispatch()

  const handleNameChange = async (target) => {
    setForm('orderName', target.value)
    await dispatch(setOrderName(target.value))
  }

  return (
    <Form id='OrderDetailsForm'>
      {/* Order Category */}
      <Form.Group>
        <ButtonGroup toggle>
          <ToggleButton
            type='radio'
            name='carry-out-toggle'
            variant='outline-primary'
            value={form.orderCategory}
            checked={form.orderCategory === 'Carry Out'}
            onChange={() => setForm('orderCategory', 'Carry Out')}
          >
            Carry Out
          </ToggleButton>

          <ToggleButton
            type='radio'
            name='delivery-toggle'
            variant='outline-primary'
            value={form.orderCategory}
            checked={form.orderCategory === 'Delivery'}
            onChange={() => setForm('orderCategory', 'Delivery')}
          >
            Delivery
          </ToggleButton>
        </ButtonGroup>

        <Form.Text>
          {`${form.orderCategory} selected.`}
        </Form.Text>

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
              value={form.orderName.trimStart()}
              minLength={orderForms.orderName.minLength.value.toString()}
              maxLength={orderForms.orderName.maxLength.value.toString()}
              onChange={({ target }) => handleNameChange(target)}
              placeholder='e.g. Jane Doe'
              isInvalid={!!errors.orderName}
            />
            <Form.Text>
              {charactersRemaining(
                form.orderName, orderForms.orderName.maxLength.value,
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
              value={form.orderNotes.trimStart()}
              maxLength={orderForms.orderNotes.maxLength.value.toString()}
              onChange={({ target }) => setForm('orderNotes', target.value)}
              isInvalid={!!errors.orderNotes}
            />
            <Form.Text>
              {charactersRemaining(
                form.orderNotes, orderForms.orderNotes.maxLength.value,
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

export default OrderDetailsForm
