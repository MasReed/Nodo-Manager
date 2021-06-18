import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { resetCart } from '../../reducers/cartReducer'

import Costs from './Costs'
import MyOrderForm from './MyOrderForm'
import MyOrderItems from './MyOrderItems'
import UpdateCustomItemModal from './UpdateCustomItemModal'

const MyOrderPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [showCustomize, setShowCustomize] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const [costs, setCosts] = useState({})

  const cancelOrderSequence = () => {
    dispatch(resetCart())
    history.push('/menu')
  }

  const purchaseOrderSequence = () => {
    history.push('/checkout')
  }


  return (
    <Container className='pt-5'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='m-0'>Your Order</h1>
        <Button
          onClick={() => history.push('/menu')}
          variant='outline-secondary'
        >
          Menu
        </Button>
      </div>

      <hr />
      <MyOrderForm costs={costs} />
      <hr />

      <MyOrderItems
        setSelectedItem={setSelectedItem}
        setShowCustomize={setShowCustomize}
      />

      <Costs setCosts={setCosts} />
      <hr style={{ marginTop: '8px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outline-warning"
            onClick={ cancelOrderSequence }
          >Cancel</Button>
        <div>
          <Button
            onClick={() => history.push('/menu') }
            className='mx-2'
            variant="outline-secondary"
          >
            Add More
          </Button>
          <Button
            type='submit'
            form='myOrderForm'
            className='mx-2'
            onClick={ purchaseOrderSequence }
          >
            Checkout
          </Button>
        </div>
      </div>

      <UpdateCustomItemModal
        show={showCustomize}
        setShow={setShowCustomize}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </Container>
  )
}

export default MyOrderPage
