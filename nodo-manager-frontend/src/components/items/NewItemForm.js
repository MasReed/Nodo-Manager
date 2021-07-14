import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { addItemActionCreator } from '../../reducers/itemReducer'

const NewItemForm = ({ show, setShow }) => {

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: '',
    description: '',
    ingredients: [],
    category: '',
    price: '',
    availability: 'Unavailable'
  })

  const [errors, setErrors] = useState({})

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

  const findFormErrors = () => {
    const {
      name,
      description,
      ingredients,
      category,
      price,
      availability
    } = form

    const newErrors = {}

    // Name errors
    if (!name || name === '') newErrors.name = 'An item name is required.'

    // Description errors
    if (description.length > 150) newErrors.description = 'Description is too long!'

    // Ingredient errors
    if (ingredients.length > 250) newErrors.ingredients = 'Ingredients list has too many characters.'

    // Category errors
    if (!category || category === '') newErrors.category = 'An item category is required.'

    // Price errors
    if (!price || price === '') newErrors.price = 'A price is required.'
    else if (typeof price !== 'number') {
      if (isNaN(Number(price))) {
        newErrors.price = 'Price must be a number'
      } else {
        setField('price', Number(price))
      }
    } else if (price < 0) newErrors.price = 'Price cannot be negative.'

    // Availability errors
    if (!availability || availability === '') newErrors.availability = 'Choose an availability.'

    return newErrors
  }


  const createItem = async (event) => {
    event.preventDefault()

    //convert comma-separated items into array if neccessary
    const ingredientsArray = Array.isArray(form.ingredients)
      ? form.ingredients
      : form.ingredients.split(/\s*(?:,|$)\s*/)

    const newErrors = findFormErrors()

    // Check for any form errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {

      const newItemObject = {
        name: form.name,
        description: form.description,
        ingredients: ingredientsArray,
        category: form.category,
        price: form.price,
        availability: form.availability
      }

      try {
        await dispatch(addItemActionCreator(newItemObject))

        setForm({
          name: '',
          description: '',
          ingredients: [],
          category: '',
          price: '',
          availability: 'Unavailable'
        })
        setShow(false) // state from parent

      } catch (err) {
        await dispatch(toastAlertCreator(err))
      }
    }
  }

  const handleCancel = () => {
    setForm({
      name: '',
      description: '',
      ingredients: [],
      category: '',
      price: '',
      availability: 'Unavailable'
    })
    setErrors({})
    setShow(false) // state from parent
  }

  const charactersRemaining = (str, limit) => {
    const diff = limit - str.length
    return (diff < 21) ? diff + ' character(s) remaining' : null
  }

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={ () => setShow(false) }
        backdrop="static"
        keyboard={false}
        dialogClassName='modal-70w'
      >
        <Modal.Header closeButton>
          <Modal.Title>Make A New Creation</Modal.Title>
        </Modal.Header>

        <AlertBanner />

        <Modal.Body>
          <Form id='newItemForm' onSubmit={ createItem }>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={form.name}
                maxLength='40'
                onChange={ ({ target }) => setField('name', target.value) }
                isInvalid={ !!errors.name }
              />
              <Form.Text>{charactersRemaining(form.name, 40)}</Form.Text>
              <Form.Control.Feedback type='invalid'>
                { errors.name }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                value={form.category}
                maxLength='50'
                onChange={ ({ target }) => setField('category', target.value) }
                isInvalid={ !!errors.category }
              />
              <Form.Text>{charactersRemaining(form.category, 50)}</Form.Text>
              <Form.Control.Feedback type='invalid'>
                { errors.category }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={form.description}
                maxLength='90'
                onChange={ ({ target }) => setField('description', target.value) }
                isInvalid={ !!errors.description }

              />
              <Form.Text>{charactersRemaining(form.description, 90)}</Form.Text>
              <Form.Control.Feedback type='invalid'>
                { errors.description }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control
                value={form.ingredients}
                onChange={ ({ target }) => setField('ingredients', target.value) }
                placeholder='Separate with a comma'
                isInvalid={ !!errors.ingredients }
              />
              <Form.Control.Feedback type='invalid'>
                { errors.ingredients }
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                value={form.price}
                maxLength='7'
                onChange={ ({ target }) => setField('price', target.value) }
                isInvalid={ !!errors.price }
              />
              <Form.Control.Feedback type='invalid'>
                { errors.price }
              </Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group>
              {/* TODO: add functionality */}
              <Form.File
                id='itemImageFile'
                label='Upload an item image'
                onChange={ (event) => console.log(event.target.files)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type='submit' form='newItemForm'>Create Item</Button>
          <Button variant="secondary" onClick={ handleCancel }>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  )
}

export default NewItemForm
