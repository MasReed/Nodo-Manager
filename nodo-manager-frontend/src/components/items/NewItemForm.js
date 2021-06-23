import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { addItemActionCreator } from '../../reducers/itemReducer'

const NewItemForm = ({ show, setShow }) => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [availability, setAvailability] = useState('')

  const createItem = (event) => {
    event.preventDefault()

    //convert comma-separated items into array if neccessary
    const ingredientsArray = Array.isArray(ingredients)
      ? ingredients
      : ingredients.split(/\s*(?:,|$)\s*/)

    const newItemObject = {
      name: name,
      description: description,
      ingredients: ingredientsArray,
      category: category,
      price: price,
      availability: availability
    }

    dispatch(addItemActionCreator(newItemObject))

    setName('')
    setDescription('')
    setIngredients([])
    setCategory('')
    setPrice(0)
    setAvailability('')
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

        <Modal.Body>
          <Form id='newItemForm' onSubmit={ createItem }>
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

            <Form.Group>
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
          <Button variant="secondary" onClick={ () => setShow(false) }>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  )
}

export default NewItemForm
