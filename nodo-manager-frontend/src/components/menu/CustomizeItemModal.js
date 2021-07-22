import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { addItemToCartActionCreator } from '../../reducers/cartReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const CustomizeItemModal = ({ show, setShow, selectedItem, setSelectedItem }) => {

  const dispatch = useDispatch()

  const [checkedMods, setCheckedMods] = useState([])
  const [forName, setForName] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const ingredientsWithCheck = selectedItem.ingredients
      ? selectedItem.ingredients.map(ingredient =>
        ({ ingredient: ingredient, checked: true }))
      : {}

      setCheckedMods(ingredientsWithCheck)
  }, [ selectedItem ])

  //
  const addCustomItem = async (event) => {
    event.preventDefault()

    try {
      const customItemObject = {
        baseItemId: selectedItem._id,
        baseName: selectedItem.name,
        baseIngredients: selectedItem.ingredients,
        basePrice: selectedItem.price,
        modIngredients: checkedMods,
        whos: forName,
        notes: notes,
        uniqueId: selectedItem.uniqueId || selectedItem._id + forName + Math.random()
      }

      await dispatch(addItemToCartActionCreator(customItemObject))

      resetForm()

    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  //
  const resetForm = () => {
    setForName('')
    setCheckedMods({})
    setNotes('')
    setSelectedItem({})
    setShow(false)
  }

  return (
    <Modal
      show={show}
      onHide={ resetForm }
      dialogClassName='modal-60w'
      backdrop="static"
      keyboard={false}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Customize Your {selectedItem.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='customizeItemForm' onSubmit={ addCustomItem }>

          {/* Item For Name */}
          <Form.Group>
            <Form.Label>Who's is it?</Form.Label>
            <Form.Control
              value={forName.trim()}
              maxLength='30'
              onChange={ ({ target }) => setForName(target.value) }
            />
            <Form.Text>{charactersRemaining(forName, 30)}</Form.Text>
          </Form.Group>

          {/* Ingredient Mods */}
          <Form.Group>
            <Form.Label>Comes With</Form.Label>
            {
              selectedItem.ingredients &&
              selectedItem.ingredients.map(ingredient =>
                <Form.Check
                  key={ingredient}
                  id={ingredient}
                  type='checkbox'
                  label={ingredient}
                  defaultChecked={true}
                  onChange={ (event) => {

                    setCheckedMods(checkedMods.map(object =>
                      object.ingredient === event.target.id
                      ? {...object, checked: event.target.checked}
                      : object
                    ))
                  }}
                />
              )
            }
          </Form.Group>

          {/* Notes */}
          <Form.Group>
            <Form.Label>Anything else we should know?</Form.Label>
            <Form.Control
              value={notes.trim()}
              maxLength='150'
              placeholder='e.g. peanut allergy'
              onChange={ ({ target }) => setNotes(target.value) }
            />
            <Form.Text>{charactersRemaining(notes, 150)}</Form.Text>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outline-warning"
            onClick={ resetForm }
          >
            Cancel
          </Button>
          <Button type='submit' form='customizeItemForm'>Add to Order</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomizeItemModal
