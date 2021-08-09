import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Costs from './Costs'
import OrderDetailsForm from './OrderDetailsForm'
import OrderItems from './OrderItems'
import ItemCustomizationModal from '../menu/ItemCustomizationModal'

import useForm from '../../hooks/useForm'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { resetCurrentOrder } from '../../reducers/currentOrderReducer'
import { updateOrderActionCreator } from '../../reducers/orderReducer'

const EditOrderModal = ({ order, show, setShow }) => {
  const dispatch = useDispatch()
  const currentOrder = useSelector((state) => state.currentOrder)

  const [form, setForm, errors, isValidated] = useForm({
    orderCategory: order.category,
    orderName: order.name,
    orderNotes: order.notes,
  })

  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [costs, setCosts] = useState(order.costs)

  //
  const handleUpdateSubmission = async (event) => {
    event.preventDefault()

    // Check for any form errors
    if (isValidated()) {
      try {
        const updatedOrderObject = {
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

        await dispatch(
          updateOrderActionCreator(order._id, updatedOrderObject),
        )

        await dispatch(resetCurrentOrder())

        setForm({
          orderCategory: form.orderCategory,
          orderName: form.orderName,
          orderNotes: form.orderNotes,
        })

        setShow(false)
      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  //
  const handleModalClose = async () => {
    await dispatch(resetCurrentOrder())

    setForm({
      orderCategory: order.category,
      orderName: order.name,
      orderNotes: order.notes,
    })
    setShow(false)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleModalClose}
        dialogClassName='modal-60w'
        backdrop='static'
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {`Editing ${order.name}'s Order`}
            <h6>
              ID:
              {order._id}
            </h6>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

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

        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-between'>
          {/* Cancel */}
          <Button variant='outline-warning' onClick={handleModalClose}>
            Cancel
          </Button>

          {/* Save */}
          <Button onClick={handleUpdateSubmission}>Save Updates</Button>
        </Modal.Footer>

      </Modal>

      <ItemCustomizationModal
        item={selectedItem}
        setItem={setSelectedItem}
        show={showCustomize}
        setShow={setShowCustomize}
        isUpdating
      />
    </>
  )
}

export default EditOrderModal
