import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const CustomizeItemModal = ({ show, setShow, orderItems, setOrderItems, selectedItem, setSelectedItem }) => {

  const [checkedMods, setCheckedMods] = useState({})

  useEffect(() => {
    const ingredientsWithCheck = selectedItem.ingredients
      ? selectedItem.ingredients.map(ingredient =>
        ({ ingredient: ingredient, checked: true }))
      : {}

      setCheckedMods(ingredientsWithCheck)
  }, [ selectedItem ])


  const addCustomItem = (event) => {
    event.preventDefault()

    console.log('SELECTED', selectedItem)

    setShow(false)
    setOrderItems([...orderItems, 'newItem'])
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
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
            />
            <Form.Text>(optional)</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Comes With</Form.Label>
            {
              (Object.keys(checkedMods).length !== 0) ?
              checkedMods.map(object => (
                <Form.Check
                  key={object.ingredient}
                  id={object.ingredient}
                  type='checkbox'
                  label={object.ingredient}
                  defaultChecked={object.checked}
                  onChange={ (event) => {
                    console.log('eventId', event.target.id)
                    console.log('status', event.target.checked)
                  }}
                />
              ))
              : null
            }
          </Form.Group>

          <Form.Group>
            <Form.Label>Anything else we should know?</Form.Label>
            <Form.Control
              placeholder='e.g. peanut allergy'
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
            }}
          >Cancel</Button>
          <Button type='submit' form='customizeItemForm'>Add to Order</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomizeItemModal
