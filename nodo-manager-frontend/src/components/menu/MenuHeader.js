import React from 'react'

import Button from 'react-bootstrap/Button'

const MenuHeader = ({ show, setShow }) => {

  return (
    <div className='m-0 p-0' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h2 className='m-0 p-0'>Menu</h2>
      <Button onClick={() => setShow(true)} variant='outline-secondary'>My Order</Button>
    </div>
  )
}

export default MenuHeader
