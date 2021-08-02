import React from 'react'
import { useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'

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

      { /* eslint no-underscore-dangle: 0 */ }
      {
        currentUser.orders && currentUser.orders.map((order) => (
          <div key={order._id}>
            <div className='d-flex justify-content-between'>
              <div>
                <h4>
                  {`${new Date(order.updatedAt).toLocaleString()}`}
                </h4>
                <h6>{`ID: ${order._id}`}</h6>
              </div>

              <div className='text-right'>
                <h2>{order.category}</h2>
                <h4>
                  {`Items: ${order.items && order.items.length}`}
                </h4>
              </div>
            </div>

            <div className='d-flex justify-content-between'>
              <p>{`Notes: ${order.notes}`}</p>

              <p className='m-0 text-right'>
                {`Total: ${order.costs.total}`}
              </p>
            </div>

            <hr />
          </div>
        ))
      }

    </Container>
  )
}

export default MyAccountPage
