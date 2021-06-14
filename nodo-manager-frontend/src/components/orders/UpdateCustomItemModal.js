import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { updateCartItemActionCreator } from '../../reducers/cartReducer'

const CustomizeItemModal = ({ show, setShow, selectedItem, setSelectedItem }) => {

  const dispatch = useDispatch()

  const [modList, setModList] = useState([])
  const [forName, setForName] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setModList(selectedItem.modIngredients)
    setForName(selectedItem.whos)
    setNotes(selectedItem.notes)
  }, [ selectedItem ])


  const updateCustomItem = (event) => {
    event.preventDefault()

    const customItemObject = {
      ...selectedItem,
      modIngredients: modList,
      whos: forName,
      notes: notes,
    }

    dispatch(updateCartItemActionCreator(customItemObject))

    setShow(false)
    setForName('')
    setNotes('')
    setModList([])
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
        <Modal.Title>Customize Your {selectedItem.baseName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='updateCustomItemForm' onSubmit={ updateCustomItem }>

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
              selectedItem.modIngredients &&
              selectedItem.modIngredients.map(obj =>
                <Form.Check
                  key={obj.ingredient}
                  id={obj.ingredient}
                  type='checkbox'
                  label={obj.ingredient}
                  defaultChecked={obj.checked}
                  onChange={ (event) => {

                    setModList(modList.map(object =>
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
              setModList([])
              setSelectedItem({})
              setForName('')
              setNotes('')
            }}
          >Cancel</Button>
          <Button type='submit' form='updateCustomItemForm'>Update</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomizeItemModal
