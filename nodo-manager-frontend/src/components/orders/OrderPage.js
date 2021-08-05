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
// import MyOrderItems from './MyOrderItems'
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

  const getInitialDefaultOrderName = () => {
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

  const [form, setForm, errors, isValidated] = useForm({
    orderCategory: 'Carry Out',
    orderName: getInitialDefaultOrderName(),
    orderNotes: '',
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

      <>
        {
          (currentOrder.items && currentOrder.items.length > 0)
          && currentOrder.items.map((item) => (
            <div key={item.uniqueId}>
              <div>
                <div className='d-flex justify-content-between'>
                  <h2 className='my-0 py-2'>{item.baseName}</h2>
                  <h2 className='my-0 py-2 text-capitalize'>{item.whos}</h2>
                </div>

                <div className='my-0'>
                  <h6 className='my-0 pt-2 pb-1'>Ingredients:</h6>
                  <p className='my-0 px-4 py-0'>
                    {item.modIngredients.filter((obj) => obj.checked).map((obj) => obj.ingredient).join(', ')}
                  </p>
                  <p className='my-0 px-4 py-0'>
                    <small>
                      Exclusions:&nbsp;
                      {item.modIngredients.filter((obj) => !obj.checked).map((obj) => obj.ingredient).join(', ')}
                    </small>
                  </p>
                  {
                    item.notes
                    && (
                      <>
                        <h6 className='my-0 py-2'>Notes:</h6>
                        <p className='my-0 px-4 py-0'>{item.notes}</p>
                      </>
                    )
                  }
                </div>

                <div className='d-flex justify-content-between'>
                  <div className='my-auto'>
                    <Button
                      onClick={() => deleteOrderItem(item.uniqueId)}
                      variant='outline-danger'
                      size='sm'
                      style={{ border: 'hidden' }}
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={() => updateOrderItem(item.uniqueId)}
                      variant='outline-secondary'
                      size='sm'
                      style={{ border: 'hidden' }}
                    >
                      Edit
                    </Button>
                  </div>
                  <p className='my-0 py-2'>
                    Item Total: $
                    {item.basePrice}
                  </p>
                </div>
              </div>
              <hr className='mt-0' />
            </div>
          ))
        }
      </>

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
            Checkout
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
