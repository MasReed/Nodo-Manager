import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import Costs from './Costs'
import OrderDetailsForm from './OrderDetailsForm'
import OrderItems from './OrderItems'
import ItemCustomizationModal from '../menu/ItemCustomizationModal'

import useForm from '../../hooks/useForm'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { resetCurrentOrder } from '../../reducers/currentOrderReducer'
import { addOrderActionCreator, updateOrderActionCreator } from '../../reducers/orderReducer'

const OrderPage = ({ order }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentOrder = useSelector((state) => {
    if (!order) {
      return state.currentOrder
    }
    return order
  })
  const currentUser = useSelector((state) => state.currentUser)

  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [costs, setCosts] = useState({})

  //
  const getDefaultOrderName = () => {
    let defaultName

    if (currentOrder.name) {
      defaultName = currentOrder.name
    } else if (currentUser) {
      defaultName = currentUser.name
    } else if (currentOrder && currentOrder.items.length > 0) {
      const itemWhosIndex = currentOrder.items.findIndex((elem) => elem.whos !== '')

      console.log('itemswhosindex', itemWhosIndex)

      if (itemWhosIndex !== -1) {
        defaultName = currentOrder.items[itemWhosIndex].whos
      }
      defaultName = ''
    }
    return defaultName
  }

  //
  const [form, setForm, errors, isValidated, resetForm] = useForm({
    orderCategory: currentOrder.category || 'Carry Out',
    orderName: getDefaultOrderName() || '',
    orderNotes: currentOrder.notes || '',
  })

  //
  const cancelOrderSequence = () => {
    dispatch(resetCurrentOrder())
    resetForm()
    history.push('/menu')
  }

  //
  const saveOrder = async (event) => {
    event.preventDefault()

    if (currentOrder.items.length < 1) {
      await dispatch(toastAlertCreator({ message: 'No items in order!' }))
      // history.push('/menu')
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

        if (currentOrder.isUpdating) {
          await dispatch(updateOrderActionCreator(currentOrder._id, orderObject))
        } else {
          await dispatch(addOrderActionCreator(orderObject))
        }

        await dispatch(resetCurrentOrder())
        resetForm()
        history.push('/order-confirmed')
      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  return (
    <Container className='pt-5'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>
          {currentOrder.name ? `${currentOrder.name}'s Order` : 'Your Order'}
        </h1>

        <h6 className='align-self-center m-0'>
          {currentOrder._id ? `ID: ${currentOrder._id}` : null}
        </h6>

        {/* Menu Button */}
        <Button
          onClick={() => history.push('/menu')}
          variant='outline-secondary'
        >
          Menu
        </Button>
      </div>

      <hr />

      {/* Order Form with Category, Name, Notes */}
      <OrderDetailsForm
        form={form}
        setForm={setForm}
        errors={errors}
      />

      <hr />

      {/* List of Items in Order */}
      <OrderItems
        setSelectedItem={setSelectedItem}
        setShowCustomize={setShowCustomize}
      />

      {/* Order Costs Display */}
      <Costs setCosts={setCosts} />

      <hr style={{ marginTop: '8px' }} />

      {/* Order Option Buttons */}
      <div className='d-flex justify-content-between'>

        {/* Cancel Order Button */}
        <Button
          variant='outline-warning'
          onClick={cancelOrderSequence}
        >
          Cancel
        </Button>

        <div>
          {/* Add More Items to Order Button */}
          <Button
            onClick={() => history.push('/menu')}
            className='mx-2'
            variant='outline-secondary'
          >
            Add More
          </Button>

          {/* Save Updates or Checkout Button */}
          <Button
            className='mx-2'
            onClick={saveOrder}
          >
            {currentOrder.isUpdating ? 'Save Updates' : 'Checkout'}
          </Button>
        </div>
      </div>

      {/* Modal Component for Item Customization */}
      <ItemCustomizationModal
        item={selectedItem}
        setItem={setSelectedItem}
        show={showCustomize}
        setShow={setShowCustomize}
        isUpdating
      />

    </Container>
  )
}

export default OrderPage
