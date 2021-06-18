import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { resetCart } from '../../reducers/cartReducer'

import Costs from './Costs'
import MyOrderForm from './MyOrderForm'
import MyOrderItems from './MyOrderItems'
import PaymentModal from './PaymentModal'
import UpdateCustomItemModal from './UpdateCustomItemModal'

const MyOrderPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [showCustomize, setShowCustomize] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const [costs, setCosts] = useState({})

  const cancelOrderSequence = () => {
    dispatch(resetCart())
    history.push('/menu')
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
            className='mx-2'
            onClick={ () => setShowPayment(true) }
          >
            Checkout
          </Button>
        </div>
      </div>

      <PaymentModal
        costs={costs}
        show={showPayment}
        setShow={setShowPayment}
      />

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
