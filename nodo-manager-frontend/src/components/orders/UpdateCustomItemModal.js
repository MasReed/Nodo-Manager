import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { toastAlertCreator } from '../../reducers/alertReducer';
import { updateCartItemActionCreator } from '../../reducers/cartReducer';
import charactersRemaining from '../../utilities/charactersRemaining';

const CustomizeItemModal = ({
  show, setShow, selectedItem, setSelectedItem,
}) => {
  const dispatch = useDispatch();

  const [modList, setModList] = useState([]);
  const [forName, setForName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setModList(selectedItem.modIngredients);
    setForName(selectedItem.whos);
    setNotes(selectedItem.notes);
  }, [selectedItem]);

  //
  const resetForm = () => {
    setForName('');
    setNotes('');
    setModList([]);
    setSelectedItem({});
    setShow(false);
  };

  //
  const updateCustomItem = async (event) => {
    event.preventDefault();

    try {
      const customItemObject = {
        ...selectedItem,
        modIngredients: modList,
        whos: forName,
        notes,
      };

      await dispatch(updateCartItemActionCreator(customItemObject));

      resetForm();
    } catch (err) {
      await dispatch(toastAlertCreator(err));
    }
  };

  return (
    <Modal
      show={show}
      onHide={resetForm}
      dialogClassName="modal-60w"
      backdrop="static"
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Customize Your
          {selectedItem.baseName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="updateCustomItemForm" onSubmit={updateCustomItem}>

          {/* Item For Name */}
          <Form.Group>
            <Form.Label>{'Who\'s is it?'}</Form.Label>
            <Form.Control
              value={forName}
              maxLength="30"
              onChange={({ target }) => setForName(target.value)}
            />
            <Form.Text>{forName && charactersRemaining(forName, 30)}</Form.Text>
          </Form.Group>

          {/* Ingredient Mods */}
          <Form.Group>
            <Form.Label>Comes With</Form.Label>
            {
              selectedItem.modIngredients
              && selectedItem.modIngredients.map((obj) => (
                <Form.Check
                  key={obj.ingredient}
                  id={obj.ingredient}
                  type="checkbox"
                  label={obj.ingredient}
                  defaultChecked={obj.checked}
                  onChange={(event) => {
                    setModList(modList.map((object) => (object.ingredient === event.target.id
                      ? { ...object, checked: event.target.checked }
                      : object)));
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
              maxLength="150"
              placeholder="e.g. peanut allergy"
              onChange={({ target }) => setNotes(target.value)}
            />
            <Form.Text>{notes && charactersRemaining(notes, 150)}</Form.Text>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="outline-warning"
          onClick={resetForm}
        >
          Cancel
        </Button>
        <Button type="submit" form="updateCustomItemForm">Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomizeItemModal;
