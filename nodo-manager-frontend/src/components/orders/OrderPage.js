/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ToggleButton from 'react-bootstrap/ToggleButton'

import Costs from './Costs'
import OrderDetailsForm from './OrderDetailsForm'
import OrderItems from './OrderItems'
import UpdateCustomItemModal from './UpdateCustomItemModal'

import { orderForms } from '../../configurations/formConfigs'
import useForm from '../../hooks/useForm'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { initializeCurrentOrder, resetCurrentOrder, deleteItemInOrder } from '../../reducers/currentOrderReducer'
import { addOrderActionCreator, updateOrderActionCreator } from '../../reducers/orderReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const OrderPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentOrder = useSelector((state) => state.currentOrder)
  const currentUser = useSelector((state) => state.currentUser)

  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [costs, setCosts] = useState({})
  const [isUpdating, setIsUpdating] = useState(false)

  //
  const getDefaultOrderName = () => {
    let defaultName

    if (currentUser) {
      defaultName = currentUser.name
    } else {
      const itemWhosIndex = currentOrder.items.findIndex((elem) => elem.whos !== '')

      if (itemWhosIndex !== -1) {
        defaultName = currentOrder[itemWhosIndex].whos
      }
      defaultName = ''
    }
  return defaultName
  }

  //
  const [form, setForm, errors, isValidated] = useForm({
    orderCategory: currentOrder.category || 'Carry Out',
    orderName: getDefaultOrderName(),
    orderNotes: currentOrder.notes || '',
  })

  const cancelOrderSequence = () => {
    dispatch(resetCurrentOrder())
    history.push('/menu')
  }

  const updateOrderItem = (id) => {
    setSelectedItem(currentOrder.items.find((item) => item.uniqueId === id))
    setShowCustomize(true)
  }

  const deleteOrderItem = (id) => {
    dispatch(deleteItemInOrder(id))
  }

  const addOrder = async (event) => {
    event.preventDefault()

    if (currentOrder.items.length < 1) {
      await dispatch(toastAlertCreator({ message: 'No items in order!' }))
      history.push('/menu')
    } else if (isValidated()) {
      try {
        const orderObject = {
          category: form.orderCategory,
          items: currentOrder.items,
          name: form.orderName,
          notes: form.orderNotes,
          costs: {
            subTotal: costs.subTotal,
            taxRate: costs.taxRate,
            taxAmount: costs.taxAmount,
            total: costs.total,
          },
        }

        await dispatch(addOrderActionCreator(orderObject))
        await dispatch(resetCurrentOrder())
        history.push('/order-confirmed')
      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  const handleCheckoutSequence = () => {
    console.log('HANDLING IT')
  }

  return (
    <Container className='pt-5'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>Your Order</h1>
        <Button
          onClick={() => history.push('/menu')}
          variant='outline-secondary'
        >
          Menu
        </Button>
      </div>

      <hr />

      <OrderDetailsForm
        form={form}
        setForm={setForm}
        errors={errors}
      />

      <hr />

      <OrderItems />

      <Costs setCosts={setCosts} />
      <hr style={{ marginTop: '8px' }} />

      <div className='d-flex justify-content-between'>
        <Button
          variant='outline-warning'
          onClick={cancelOrderSequence}
        >
          Cancel
        </Button>
        <div>
          <Button
            onClick={() => history.push('/menu')}
            className='mx-2'
            variant='outline-secondary'
          >
            Add More
          </Button>
          <Button
            className='mx-2'
            onClick={addOrder}
          >
            {isUpdating ? 'Save Updates': 'Checkout'}
          </Button>
        </div>
      </div>

      <UpdateCustomItemModal
        show={showCustomize}
        setShow={setShowCustomize}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

    </Container>
  )
}

export default OrderPage
