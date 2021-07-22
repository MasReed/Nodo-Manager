import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { updateItemActionCreator } from '../../reducers/itemReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const UpdateItemForm = ({ item, show, setShow }) => {

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: item.name,
    category: item.category,
    description: item.description,
    ingredients: item.ingredients,
    price: item.price,
    availability: item.availability
  })

  // Form related errors
  const [errors, setErrors] = useState({})

  // Easy form customization
  const formConfig = {
    name: {
      isEmpty: { errorMessage: 'An item name is required.' },
      maxLength: { value: 50, errorMessage: 'Item name is too long' },
    },
    category: {
      isEmpty: { errorMessage: 'An item category is required.' },
      maxLength: { value: 50, errorMessage: 'Category is too long.'}
    },
    description: {
      maxLength: { value: 150, errorMessage: 'Description is too long!' },
    },
    ingredients: {
      maxLength: {
        value: 250,
        errorMessage: 'Ingredients list has too many characters.'
      }
    },
    price: {
      isEmpty: { errorMessage: 'A price is required.' },
      isNaN: { errorMessage: 'Price must be a number.' },
      isNegative: { errorMessage: 'Price cannot be negative.'  },
      maxLength: { value: 10, errorMessage: 'Price is too large.' },
    },
    availability: {
      isEmpty: { errorMessage: 'Choose an availability.' }
    },
  }

  // Update single form field with value
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Remove any errors from the error object
    if (!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }

  //
  const findFormErrors = () => {
    const {
      name,
      category,
      description,
      ingredients,
      price,
      availability
    } = form

    const newErrors = {}

    // Name errors
    if (!name || name === '') {
      newErrors.name = formConfig.name.isEmpty.errorMessage

    } else if (name.length > formConfig.name.maxLength) {
      newErrors.name = formConfig.name.maxLength.errorMessage
    }

    // Category errors
    if (!category || category === '') {
      newErrors.category = formConfig.category.isEmpty.errorMessage
    } else if (category.length > formConfig.category.maxLength.value) {
      newErrors.category = formConfig.category.maxLength.value
    }

    // Description errors
    if (description.length > formConfig.description.maxLength) {
      newErrors.description = formConfig.description.maxLength.errorMessage
    }

    // Ingredient errors
    if (ingredients.length > formConfig.ingredients.maxLength) {
      newErrors.ingredients = formConfig.ingredients.maxLength.errorMessage
    }

    // Price errors
    if (!price || price === '') {
      newErrors.price = formConfig.price.isEmpty.errorMessage

    } else if (typeof price !== 'number') {
      if (isNaN(Number(price))) {
        newErrors.price = formConfig.price.isNaN.errorMessage
      } else {
        setField('price', Number(price))

        if (price < 0) {
          newErrors.price = formConfig.price.isNegative.errorMessage
        }
      }

    } else if (price < 0) {
      newErrors.price = formConfig.price.isNegative.errorMessage

    } else if (price.length > formConfig.price.maxLength.value) {
      newErrors.price = formConfig.price.maxLength.errorMessage
    }

    // Availability errors
    if (!availability || availability === '') {
      newErrors.availability = formConfig.availability.isEmpty.errorMessage
    }

    return newErrors
  }

  //
  const callUpdateItem = async (event) => {
    event.preventDefault()

    const ingredientsArray = Array.isArray(form.ingredients)
      //convert comma-separated items into array if neccessary
      ? form.ingredients
      : form.ingredients.split(/\s*(?:,|$)\s*/)

    const newErrors = findFormErrors()

    // Check for any form errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {

      try {
        const updatedItemObject = {
          ...item,
          name: form.name,
          category: form.category,
          description: form.description,
          ingredients: ingredientsArray,
          price: form.price,
          availability: form.availability
        }

        // Dispatch to item reducer
        await dispatch(updateItemActionCreator(item._id, updatedItemObject))

        setShow(false) // state from parent; closes modal

      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  //
  const handleCanceledForm = () => {
    setForm({
      name: item.name,
      category: item.category,
      description: item.description,
      ingredients: item.ingredients,
      price: item.price,
      availability: item.availability
    })
    setErrors({})
    setShow(false) // state from parent; closes modal
  }

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={ () => handleCanceledForm() }
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Make Updates to {item.name}</Modal.Title>
        </Modal.Header>

        <AlertBanner />

        <Modal.Body>
          <Form id='updateItemForm' onSubmit={ callUpdateItem }>

            {/* Name */}
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={form.name.trim()}
                maxLength={formConfig.name.maxLength.value.toString()}
                onChange={ ({ target }) => setField('name', target.value) }
                isInvalid={ !!errors.name }
              />
              <Form.Text>
                {charactersRemaining(
                  form.name, formConfig.name.maxLength.value
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
                maxLength={formConfig.category.maxLength.value.toString()}
                onChange={ ({ target }) => setField('category', target.value) }
                isInvalid={ !!errors.category }
              />
              <Form.Text>
                {charactersRemaining(
                  form.category, formConfig.category.maxLength.value
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
                maxLength={formConfig.description.maxLength.value.toString()}
                onChange={ ({ target }) => setField('description', target.value) }
                isInvalid={ !!errors.description }
              />
              <Form.Text>
                {charactersRemaining(
                  form.description, formConfig.description.maxLength.value
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
                maxLength={formConfig.ingredients.maxLength.value.toString()}
                onChange={ ({ target }) => setField('ingredients', target.value) }
                placeholder='Separate with a comma'
                isInvalid={ !!errors.ingredients }
              />
              <Form.Text>
                {charactersRemaining(
                  form.ingredients, formConfig.ingredients.maxLength.value
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
                maxLength={formConfig.price.maxLength.value.toString()}
                onChange={ ({ target }) => setField('price', target.value) }
                isInvalid={ !!errors.price }
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
                  onChange={ ({ target }) => setField('availability', target.value) }
                  isInvalid={ !!errors.availability }
                />
                <Form.Check
                  inline
                  label='Unavailable'
                  name='availability'
                  type='radio'
                  id='inline-radio-unavailable'
                  checked={form.availability === 'Unavailable'}
                  value='Unavailable'
                  onChange={ ({ target }) => setField('availability', target.value) }
                  isInvalid={ !!errors.availability }
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type='submit' form='updateItemForm'>Save</Button>
          <Button variant="secondary" onClick={ handleCanceledForm }>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  )
}

export default UpdateItemForm
