import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'
import Costs from './Costs'
import OrderDetailsForm from './OrderDetailsForm'
import OrderItems from './OrderItems'
import ItemCustomizationModal from '../menu/ItemCustomizationModal'

import useForm from '../../hooks/useForm'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { resetCurrentOrder, setOrderUpdating } from '../../reducers/currentOrderReducer'
import { isVisible } from '../../reducers/modalReducer'
import { updateOrderActionCreator } from '../../reducers/orderReducer'

const EditOrderModal = ({ order, show, setShow }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentOrder = useSelector((state) => state.currentOrder)

  const [form, setForm, errors, isValidated, resetForm] = useForm({
    orderCategory: order.category,
    orderName: order.name,
    orderNotes: order.notes,
  })

  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [costs, setCosts] = useState(order.costs)

  //
  const handleModalClose = async (doReset = true) => {
    await dispatch(resetCurrentOrder())
    await dispatch(isVisible(false))
    if (doReset) {
      resetForm()
    }
    setShow(false)
  }

  //
  const handleAddingItems = async () => {
    await dispatch(isVisible(false))
    await dispatch(setOrderUpdating(true))
    history.push('/menu')
  }

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

        // Set to form inputs vs reset to original order properties
        setForm({
          orderCategory: form.orderCategory,
          orderName: form.orderName,
          orderNotes: form.orderNotes,
        })

        handleModalClose(false) // Cleanup all but form
        dispatch(setOrderUpdating(false))
      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
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
              {`ID: ${order._id}`}
            </h6>
          </Modal.Title>
        </Modal.Header>

        <AlertBanner />

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

          <div>
            {/* Add Items */}
            <Button
              className='mx-2'
              variant='outline-secondary'
              onClick={handleAddingItems}
            >
              Add Items
            </Button>

            {/* Save */}
            <Button
              className='mx-2'
              onClick={handleUpdateSubmission}
            >
              Save Updates
            </Button>
          </div>

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
