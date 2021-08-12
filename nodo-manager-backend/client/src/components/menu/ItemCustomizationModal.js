import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { toastAlertCreator } from '../../reducers/alertReducer'
import { addItemToOrder, updateItemInOrder } from '../../reducers/currentOrderReducer'
import { isVisible } from '../../reducers/modalReducer'
import charactersRemaining from '../../utilities/charactersRemaining'

const ItemCustomizationModal = ({
  item, setItem, show, setShow, isUpdating,
}) => {
  const dispatch = useDispatch()

  const [checkedMods, setCheckedMods] = useState([])
  const [modList, setModList] = useState([])
  const [forName, setForName] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setModList(item.modIngredients)
    setForName(item.whos || '')
    setNotes(item.notes || '')
  }, [item])

  useEffect(() => {
    const ingredientsWithCheck = item.ingredients
      ? item.ingredients.map((ingredient) => ({ ingredient, checked: true }))
      : {}

    setCheckedMods(ingredientsWithCheck)
  }, [item])

  //
  const resetComponent = async () => {
    setForName('')
    setNotes('')
    setModList([])
    setItem({})
    setShow(false)
    await dispatch(isVisible(false))
  }

  //
  const updateCustomItem = async (event) => {
    event.preventDefault()

    try {
      const customItemObject = {
        ...item,
        modIngredients: modList,
        whos: forName,
        notes,
      }

      await dispatch(updateItemInOrder(customItemObject))

      resetComponent()
    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  //
  const addCustomItem = async (event) => {
    event.preventDefault()

    try {
      const customItemObject = {
        baseItemId: item._id,
        baseName: item.name,
        baseIngredients: item.ingredients,
        basePrice: item.price,
        modIngredients: checkedMods,
        whos: forName,
        notes,
        uniqueId: item.uniqueId || item._id + forName + Math.random(),
      }

      await dispatch(addItemToOrder(customItemObject))

      await resetComponent()
    } catch (err) {
      await dispatch(toastAlertCreator(err))
    }
  }

  return (
    <Modal
      show={show}
      onHide={resetComponent}
      dialogClassName='modal-60w'
      backdrop='static'
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {`Customizing Your ${item.baseName}`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='updateCustomItemForm'>

          {/* Item For Name */}
          <Form.Group>
            <Form.Label>{'Who\'s is it?'}</Form.Label>
            <Form.Control
              value={forName.trimStart()}
              maxLength='30'
              onChange={({ target }) => setForName(target.value)}
            />
            <Form.Text>{charactersRemaining(forName, 30)}</Form.Text>
          </Form.Group>

          {/* Ingredient Mods */}
          <Form.Group>
            <Form.Label>Comes With</Form.Label>
            {
              item.modIngredients
                ? item.modIngredients.map((obj) => (
                  <Form.Check
                    key={obj.ingredient}
                    id={obj.ingredient}
                    type='checkbox'
                    label={obj.ingredient}
                    defaultChecked={obj.checked}
                    onChange={(event) => {
                      setModList(modList.map((object) => (object.ingredient === event.target.id
                        ? { ...object, checked: event.target.checked }
                        : object)))
                    }}
                  />
                ))
                : item.ingredients
                && item.ingredients.map((ingredient) => (
                  <Form.Check
                    key={ingredient}
                    id={ingredient}
                    type='checkbox'
                    label={ingredient}
                    defaultChecked
                    onChange={(event) => {
                      setCheckedMods(checkedMods.map(
                        (object) => (object.ingredient === event.target.id
                          ? { ...object, checked: event.target.checked }
                          : object),
                      ))
                    }}
                  />
                ))
            }
          </Form.Group>

          {/* Notes */}
          <Form.Group>
            <Form.Label>Anything else we should know?</Form.Label>
            <Form.Control
              value={notes}
              maxLength='150'
              placeholder='e.g. peanut allergy'
              onChange={({ target }) => setNotes(target.value)}
            />
            <Form.Text>{notes && charactersRemaining(notes, 150)}</Form.Text>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-between'>
        <Button
          variant='outline-warning'
          onClick={resetComponent}
        >
          Cancel
        </Button>
        {
          isUpdating
            ? <Button onClick={updateCustomItem}>Update</Button>
            : <Button onClick={addCustomItem}>Add to Order</Button>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default ItemCustomizationModal
