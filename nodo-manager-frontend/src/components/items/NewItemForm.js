import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'
import useForm from '../../hooks/useForm'
import { itemForms } from '../../configurations/formConfigs'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { addItemActionCreator } from '../../reducers/itemReducer'
import { isVisible } from '../../reducers/modalReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const NewItemForm = ({ show, setShow }) => {
  const dispatch = useDispatch()

  const [form, setForm, errors, isValidated, resetForm] = useForm({
    itemName: '',
    itemCategory: '',
    itemDescription: '',
    itemIngredients: [],
    itemPrice: '',
    itemAvailability: 'Unavailable',
  })

  //
  const resetComponent = async () => {
    resetForm()
    setShow(false) // state from parent; closes modal
    await dispatch(isVisible(false))
  }

  //
  const callCreateItem = async (event) => {
    event.preventDefault()

    // convert comma-separated items into array if neccessary
    const ingredientsArray = Array.isArray(form.itemIngredients)
      ? form.itemIngredients
      : form.itemIngredients.split(/\s*(?:,|$)\s*/).filter((ingredient) => ingredient !== '')

    if (isValidated()) {
      try {
        const newItemObject = {
          name: form.itemName,
          category: form.itemCategory,
          description: form.itemDescription,
          ingredients: ingredientsArray,
          price: form.itemPrice,
          availability: form.itemAvailability,
        }

        // Dispatch to item reducer
        await dispatch(addItemActionCreator(newItemObject))

        resetComponent()
      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={resetComponent}
        backdrop='static'
        keyboard={false}
        dialogClassName='modal-70w'
      >
        <Modal.Header closeButton>
          <Modal.Title>Make A New Creation</Modal.Title>
        </Modal.Header>

        <AlertBanner />

        <Modal.Body>
          <Form id='newItemForm' onSubmit={callCreateItem}>

            {/* Name */}
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={form.itemName}
                maxLength={itemForms.itemName.maxLength.value.toString()}
                onChange={({ target }) => setForm('itemName', target.value)}
                isInvalid={!!errors.itemName}
              />
              <Form.Text>
                {charactersRemaining(
                  form.itemName, itemForms.itemName.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.itemName }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Category */}
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                value={form.itemCategory}
                maxLength={itemForms.itemCategory.maxLength.value.toString()}
                onChange={({ target }) => setForm('itemCategory', target.value)}
                isInvalid={!!errors.itemCategory}
              />
              <Form.Text>
                {charactersRemaining(
                  form.itemCategory, itemForms.itemCategory.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.itemCategory }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Description */}
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={form.itemDescription}
                maxLength={itemForms.itemDescription.maxLength.value.toString()}
                onChange={({ target }) => setForm('itemDescription', target.value)}
                isInvalid={!!errors.itemDescription}
              />
              <Form.Text>
                {charactersRemaining(
                  form.itemDescription, itemForms.itemDescription.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.itemDescription }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Ingredients */}
            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control
                value={form.itemIngredients}
                maxLength={itemForms.itemIngredients.maxLength.value.toString()}
                onChange={({ target }) => setForm('itemIngredients', target.value)}
                placeholder='Separate with a comma'
                isInvalid={!!errors.itemIngredients}
              />
              <Form.Text>
                {charactersRemaining(
                  form.itemIngredients, itemForms.itemIngredients.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.itemIngredients }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Price */}
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                value={form.itemPrice}
                maxLength={itemForms.itemPrice.maxLength.value.toString()}
                onChange={({ target }) => setForm('itemPrice', target.value)}
                isInvalid={!!errors.itemPrice}
              />
              <Form.Control.Feedback type='invalid'>
                { errors.itemPrice }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Availability */}
            <Form.Group>
              <Form.Label>Availability:</Form.Label>
              <div className='px-4 d-flex justify-content-between'>
                <Form.Check
                  inline
                  label='Available'
                  name='availability'
                  type='radio'
                  id='inline-radio-available'
                  checked={form.itemAvailability === 'Available'}
                  value='Available'
                  onChange={({ target }) => setForm('itemAvailability', target.value)}
                  isInvalid={!!errors.itemAvailability}
                />
                <Form.Check
                  inline
                  label='Unavailable'
                  name='availability'
                  type='radio'
                  id='inline-radio-unavailable'
                  checked={form.itemAvailability === 'Unavailable'}
                  value='Unavailable'
                  onChange={({ target }) => setForm('itemAvailability', target.value)}
                  isInvalid={!!errors.itemAvailability}
                />
              </div>
            </Form.Group>

            {/* Image */}
            <Form.Group>
              {/* TODO: add functionality */}
              <Form.File
                id='itemImageFile'
                label='Upload an item image'
                onChange={(event) => console.log(event.target.files)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type='submit' form='newItemForm'>Create Item</Button>
          <Button variant='secondary' onClick={resetComponent}>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default NewItemForm
