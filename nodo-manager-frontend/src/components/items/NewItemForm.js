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
  const [category, setCategory] = useState('')
  const [ingredients, setIngredients] = useState([])

  const createItem = (event) => {
    event.preventDefault()

    const ingredientsArray = (ingredients.length > 1) && ingredients.split(/\s*(?:,|$)\s*/)

    const newItemObject = {
      name: name,
      description: description,
      category: category,
      ingredients: ingredientsArray
    }

    dispatch(addItemActionCreator(newItemObject))

    setName('')
    setDescription('')
    setCategory('')
    setIngredients([])
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
          <Modal.Title>Make A New Creation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id='newItemForm' onSubmit={ createItem } style={{ margin: '2% 0' }}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                value={name}
                onChange={ ({ target }) => setName(target.value) }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={description}
                onChange={ ({ target }) => setDescription(target.value) }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                value={category}
                onChange={ ({ target }) => setCategory(target.value) }
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ () => setShow(false) }>
            Close
          </Button>
          <Button type='submit' form='newItemForm' variant='secondary'>Save</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default NewItemForm
