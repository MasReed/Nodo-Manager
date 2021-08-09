import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import ItemsList from './ItemsList'
import NewItemForm from './NewItemForm'

import CustomAccordion from '../site-wide/CustomAccordion'
import { isVisible } from '../../reducers/modalReducer'

const ItemsPage = () => {
  const dispatch = useDispatch()
  // Array of unique item categories
  const categories = useSelector(
    (state) => [...new Set(state.items.map((item) => item.category))],
  )

  const [showNewItemForm, setShowNewItemForm] = useState(false)

  const openNewItemModal = async () => {
    setShowNewItemForm(true)
    await dispatch(isVisible(true))
  }

  return (
    <Container className='pt-5'>

      {/* Page Header & New Item Button */}
      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>Cook Book</h1>
        <Button
          onClick={openNewItemModal}
          variant='outline-secondary'
        >
          CREATE
        </Button>
      </div>

      <hr />

      {/* Category Accordions */}
      {
        categories.map((category) => (
          <CustomAccordion key={category} text={category}>
            <ItemsList category={category} />
          </CustomAccordion>
        ))
      }

      {/* Modal Form Component */}
      <NewItemForm show={showNewItemForm} setShow={setShowNewItemForm} />

    </Container>
  )
}

export default ItemsPage
