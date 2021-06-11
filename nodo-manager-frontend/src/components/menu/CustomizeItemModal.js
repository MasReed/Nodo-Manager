import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const CustomizeItemModal = ({ show, setShow, orderItems, setOrderItems, selectedItem, setSelectedItem }) => {

  const [checkedMods, setCheckedMods] = useState({})
  const [forName, setForName] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const ingredientsWithCheck = selectedItem.ingredients
      ? selectedItem.ingredients.map(ingredient =>
        ({ ingredient: ingredient, checked: true }))
      : {}

      setCheckedMods(ingredientsWithCheck)
  }, [ selectedItem ])

  // useEffect(() => {
  //   console.log('This is the updated checkedMods: ', checkedMods)
  // }, [ checkedMods ])


  const addCustomItem = (event) => {
    event.preventDefault()

    const customItemObject = {
      baseItemId: selectedItem._id,
      baseName: selectedItem.name,
      baseIngredients: selectedItem.ingredients,
      basePrice: selectedItem.price,
      modIngredients: checkedMods,
      whos: forName,
      notes: notes
    }

    setOrderItems([...orderItems, customItemObject])

    setShow(false)
    setForName('')
    setNotes('')
    setCheckedMods({})
    setSelectedItem({})
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
        setSelectedItem({})
        setForName('')
        setNotes('')
      }}
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

          <Form.Group>
            <Form.Label>Who's is it?</Form.Label>
            <Form.Control
              value={forName}
              onChange={ ({ target }) => setForName(target.value) }
            />
            <Form.Text>(optional)</Form.Text>
          </Form.Group>

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

          <Form.Group>
            <Form.Label>Anything else we should know?</Form.Label>
            <Form.Control
              value={notes}
              placeholder='e.g. peanut allergy'
              onChange={ ({ target }) => setNotes(target.value) }
            />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outline-warning"
            onClick={ () => {
              setShow(false)
              setCheckedMods([])
              setSelectedItem({})
              setForName('')
              setNotes('')
            }}
          >Cancel</Button>
          <Button type='submit' form='customizeItemForm'>Add to Order</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomizeItemModal
