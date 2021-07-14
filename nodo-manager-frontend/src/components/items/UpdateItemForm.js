import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import AlertBanner from '../site-wide/AlertBanner'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { updateItemActionCreator } from '../../reducers/itemReducer'

const UpdateItemForm = ({ item, show, setShow }) => {

  const dispatch = useDispatch()

  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [ingredients, setIngredients] = useState(item.ingredients)
  const [category, setCategory] = useState(item.category)
  const [price, setPrice] = useState(item.price)
  const [availability, setAvailability] = useState(item.availability)

  const callUpdateItem = async (event) => {
    event.preventDefault()

    const ingredientsArray = Array.isArray(ingredients)
      //convert comma-separated items into array if neccessary
      ? ingredients
      : ingredients.split(/\s*(?:,|$)\s*/)

    const updatedItemObject = {
      ...item,
      name: name,
      description: description,
      ingredients: ingredientsArray,
      category: category,
      price: price,
      availability: availability
    }

    try {
      await dispatch(updateItemActionCreator(item._id, updatedItemObject))
      setShow(false) // state from parent

    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  const handleCancel = () => {
    setShow(false)
    setName(item.name)
    setDescription(item.description)
    setIngredients(item.ingredients)
    setCategory(item.category)
    setPrice(item.price)
    setAvailability(item.availability)
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
      >
        <Modal.Header closeButton>
          <Modal.Title>Make Updates to {item.name}</Modal.Title>
        </Modal.Header>

        <AlertBanner />

        <Modal.Body>
          <Form id='updateItemForm' onSubmit={ callUpdateItem }>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={name}
                maxLength='40'
                onChange={ ({ target }) => setName(target.value) }
              />
              <Form.Text>{charactersRemaining(name, 40)}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                value={category}
                maxLength='50'
                onChange={ ({ target }) => setCategory(target.value) }
              />
              <Form.Text>{charactersRemaining(category, 50)}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={description}
                maxLength='90'
                onChange={ ({ target }) => setDescription(target.value) }
              />
              <Form.Text>{charactersRemaining(description, 90)}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control
                value={ingredients}
                onChange={ ({ target }) => setIngredients(target.value) }
                placeholder='Separate with a comma'
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                value={price}
                maxLength='7'
                onChange={ ({ target }) => setPrice(target.value) }
              />
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
                  checked={availability === 'Available'}
                  value='Available'
                  onChange={ ({ target }) => setAvailability(target.value) }
                />
                <Form.Check
                  inline
                  label='Unavailable'
                  name='availability'
                  type='radio'
                  id='inline-radio-unavailable'
                  checked={availability === 'Unavailable'}
                  value='Unavailable'
                  onChange={ ({ target }) => setAvailability(target.value) }
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type='submit' form='updateItemForm'>Save</Button>
          <Button variant="secondary" onClick={ handleCancel }>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  )
}

export default UpdateItemForm
