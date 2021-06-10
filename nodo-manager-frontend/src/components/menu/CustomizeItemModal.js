import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const CustomizeItemModal = ({ show, setShow, orderItems, setOrderItems, selectedItem, setSelectedItem }) => {

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
        {selectedItem.name}
      </Modal.Body>

      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outline-warning"
            onClick={ () => {
              setShow(false)
            }}
          >Cancel</Button>
          <Button onClick={ addCustomItem } style={{ margin: '0 10px'}}>Add to Order</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomizeItemModal
