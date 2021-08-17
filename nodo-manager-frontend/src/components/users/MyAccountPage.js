import React from 'react'
import { useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'

const MyAccountPage = () => {
  const currentUser = useSelector((state) => state.currentUser)

  return (
    <Container className='pt-5'>
      <div className='d-flex justify-content-between'>
        <div className='m-0'>
          <h1 className='m-0'>My Account</h1>
          {/* Only show role for employees and above */}
          {
            currentUser.role.encompassedRoles.includes('employee')
              ? (
                <h6 className='my-2'>
                  <div className='d-inline pr-1'>{currentUser.role.name}</div>
                  <p className='d-inline'>|</p>
                  <div className='d-inline pl-1'>{currentUser.email}</div>
                </h6>
              )
              : (
                <h6 className='m-0 mt-2'>{currentUser.email}</h6>
              )
          }
        </div>
        <div className='m-0'>
          <h1 className='m-0'>{currentUser.name}</h1>
          <h6 className='m-0 mt-2 text-right'>{currentUser.username}</h6>
        </div>
      </div>

      <hr className='mt-2' />

      <h2 className='pt-5'>Previous Orders</h2>

      <hr />

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
