import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const UpdateItemForm = ({ item, updateItem, show, setShow }) => {

  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [ingredients, setIngredients] = useState(item.ingredients)
  const [category, setCategory] = useState(item.category)
  const [price, setPrice] = useState(item.price)
  const [availability, setAvailability] = useState(item.availability)

  const callUpdateItem = (event) => {
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

    updateItem(updatedItemObject)
    setShow(false) // state from parent
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

        <Modal.Body>
          <Form id='updateItemForm' onSubmit={ callUpdateItem }>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={name}
                maxLength='40'
                onChange={ ({ target }) => setName(target.value) }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                value={category}
                maxLength='50'
                onChange={ ({ target }) => setCategory(target.value) }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={description}
                maxLength='90'
                onChange={ ({ target }) => setDescription(target.value) }
              />
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
              <Form.Control
                value={availability}
                onChange={ ({ target }) => setAvailability(target.value) }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type='submit' form='updateItemForm'>Save</Button>
          <Button variant="secondary" onClick={ () => setShow(false) }>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  )
}

export default UpdateItemForm
