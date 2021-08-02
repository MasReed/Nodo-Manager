import React from 'react'
import { useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'

import OrdersList from '../orders/OrdersList'

const MyAccountPage = () => {
  const currentUser = useSelector((state) => state.currentUser)

  return (
    <Container className='pt-5'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0'>My Account</h1>
        <h1>{currentUser.name}</h1>
      </div>
      <hr />
      <p>{`Name: ${currentUser.name}`}</p>
      <p>{`Email: ${currentUser.email}`}</p>
      <p>{`Username: ${currentUser.username}`}</p>
      <p>{`Role: ${currentUser.role.name}`}</p>

      <h2 className='pt-5'>Previous Orders</h2>

      <hr />

      <OrdersList orders={currentUser.orders} />

    </Container>
  )
}

export default MyAccountPage
