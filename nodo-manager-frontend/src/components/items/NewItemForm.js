import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'

import { itemForms } from '../../configurations/formConfigs'
import { toastAlertCreator } from '../../reducers/alertReducer'
import { addItemActionCreator } from '../../reducers/itemReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const NewItemForm = ({ show, setShow }) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    ingredients: [],
    price: '',
    availability: 'Unavailable',
  })

  // Form related errors
  const [errors, setErrors] = useState({})

  // Update single form field with value
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })
    // Reset any errors
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      })
    }
  }

  //
  const findFormErrors = () => {
    const {
      name,
      category,
      description,
      ingredients,
      price,
      availability,
    } = form

    const newErrors = {}

    // Name errors
    if (!name || name === '') {
      newErrors.name = itemForms.itemName.isEmpty.errorMessage
    } else if (name.length > itemForms.itemName.maxLength) {
      newErrors.name = itemForms.itemName.maxLength.errorMessage
    }

    // Category errors
    if (!category || category === '') {
      newErrors.category = itemForms.itemCategory.isEmpty.errorMessage
    } else if (category.length > itemForms.itemCategory.maxLength.value) {
      newErrors.category = itemForms.itemCategory.maxLength.value
    }

    // Description errors
    if (description.length > itemForms.itemDescription.maxLength) {
      newErrors.description = itemForms.itemDescription.maxLength.errorMessage
    }

    // Ingredient errors
    if (ingredients.length > itemForms.itemIngredients.maxLength) {
      newErrors.ingredients = itemForms.itemIngredients.maxLength.errorMessage
    }

    // Price errors
    if (!price || price === '') {
      newErrors.price = itemForms.itemPrice.isEmpty.errorMessage
    } else if (typeof price !== 'number') {
      if (Number.isNaN(Number(price))) {
        newErrors.price = itemForms.itemPrice.isNaN.errorMessage
      } else {
        setField('price', Number(price))

        if (price < 0) {
          newErrors.price = itemForms.itemPrice.isNegative.errorMessage
        }
      }
    } else if (price < 0) {
      newErrors.price = itemForms.itemPrice.isNegative.errorMessage
    } else if (price.length > itemForms.itemPrice.maxLength.value) {
      newErrors.price = itemForms.itemPrice.maxLength.errorMessage
    }

    // Availability errors
    if (!availability || availability === '') {
      newErrors.availability = itemForms.itemAvailability.isEmpty.errorMessage
    }

    return newErrors
  }

  //
  const callCreateItem = async (event) => {
    event.preventDefault()

    // convert comma-separated items into array if neccessary
    const ingredientsArray = Array.isArray(form.ingredients)
      ? form.ingredients
      : form.ingredients.split(/\s*(?:,|$)\s*/)

    const newErrors = findFormErrors()

    // Check for any form errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        const newItemObject = {
          name: form.name,
          category: form.category,
          description: form.description,
          ingredients: ingredientsArray,
          price: form.price,
          availability: form.availability,
        }

        // Dispatch to item reducer
        await dispatch(addItemActionCreator(newItemObject))

        setForm({
          name: '',
          category: '',
          description: '',
          ingredients: [],
          price: '',
          availability: 'Unavailable',
        })

        setShow(false) // state from parent; closes modal
      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  //
  const handleCanceledForm = () => {
    setForm({
      name: '',
      category: '',
      description: '',
      ingredients: [],
      price: '',
      availability: 'Unavailable',
    })
    setErrors({})
    setShow(false) // state from parent; closes modal
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleCanceledForm()}
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
                value={form.name.trim()}
                maxLength={itemForms.itemName.maxLength.value.toString()}
                onChange={({ target }) => setField('name', target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Text>
                {charactersRemaining(
                  form.name, itemForms.itemName.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.name }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Category */}
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                value={form.category.trim()}
                maxLength={itemForms.itemCategory.maxLength.value.toString()}
                onChange={({ target }) => setField('category', target.value)}
                isInvalid={!!errors.category}
              />
              <Form.Text>
                {charactersRemaining(
                  form.category, itemForms.itemCategory.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.category }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Description */}
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={form.description.trim()}
                maxLength={itemForms.itemDescription.maxLength.value.toString()}
                onChange={({ target }) => setField('description', target.value)}
                isInvalid={!!errors.description}
              />
              <Form.Text>
                {charactersRemaining(
                  form.description, itemForms.itemDescription.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.description }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Ingredients */}
            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control
                value={form.ingredients}
                maxLength={itemForms.itemIngredients.maxLength.value.toString()}
                onChange={({ target }) => setField('ingredients', target.value)}
                placeholder='Separate with a comma'
                isInvalid={!!errors.ingredients}
              />
              <Form.Text>
                {charactersRemaining(
                  form.ingredients, itemForms.itemIngredients.maxLength.value,
                )}
              </Form.Text>

              <Form.Control.Feedback type='invalid'>
                { errors.ingredients }
              </Form.Control.Feedback>
            </Form.Group>

            {/* Price */}
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                value={form.price}
                maxLength={itemForms.itemPrice.maxLength.value.toString()}
                onChange={({ target }) => setField('price', target.value)}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type='invalid'>
                { errors.price }
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
                  checked={form.availability === 'Available'}
                  value='Available'
                  onChange={({ target }) => setField('availability', target.value)}
                  isInvalid={!!errors.availability}
                />
                <Form.Check
                  inline
                  label='Unavailable'
                  name='availability'
                  type='radio'
                  id='inline-radio-unavailable'
                  checked={form.availability === 'Unavailable'}
                  value='Unavailable'
                  onChange={({ target }) => setField('availability', target.value)}
                  isInvalid={!!errors.availability}
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
          <Button variant='secondary' onClick={handleCanceledForm}>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default NewItemForm
