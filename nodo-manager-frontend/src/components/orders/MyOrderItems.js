import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteCartItemActionCreator } from '../../reducers/cartReducer'

import Button from 'react-bootstrap/Button'


const MyOrderItems = ({ setSelectedItem, setShowCustomize }) => {

  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart)

  const updateCartItem = (id) => {
    setSelectedItem(cartItems.find(item => item.uniqueId === id))
    setShowCustomize(true)
  }

  const deleteCartItem = (id) => {
    if (window.confirm('OK to confirm removal')) {
      dispatch(deleteCartItemActionCreator(id))
    }
  }

  return (
    <>
    {
      (cartItems.length > 0) && cartItems.map(item =>
        (
          <div key={item.uniqueId}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 className='my-0 py-2'>{item.baseName}</h2>
                <h2 className='my-0 py-2 text-capitalize'>{item.whos}</h2>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='my-0'>
                  <h6 className='my-0 pt-2 pb-1'>Ingredients:</h6>
                  <p className='my-0 px-4 py-0'>
                    {item.modIngredients.filter(obj =>
                      obj.checked).map(obj =>
                        obj.ingredient).join(', ')
                    }
                  </p>
                  <p className='my-0 px-4 py-0'>
                    <small>Exclusions:&nbsp;
                      {item.modIngredients.filter(obj =>
                        !obj.checked).map(obj =>
                          obj.ingredient).join(', ')
                      }
                    </small>
                  </p>
                </div>

                <div className='align-self-end'>
                  <p className='my-0 py-2'>base price: {item.basePrice}</p>
                  <hr style={{ margin: '2px 0px'}} />
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h6 className='my-0 py-2'>Notes: {item.notes}</h6>
                <p className='my-0 py-2'>Item Total: {item.subTotal}</p>
              </div>

              <div>
                <Button
                  onClick={ () => deleteCartItem(item.uniqueId) }
                  variant='outline-danger'
                  size='sm'
                  style={{ border: 'hidden', marginTop: '8px'}}
                >
                  Remove
                </Button>
                <Button
                  onClick={ () => updateCartItem(item.uniqueId) }
                  variant='outline-secondary'
                  size='sm'
                  style={{ border: 'hidden', marginTop: '8px'}}
                  >
                    Edit
                  </Button>
              </div>
            </div>
            <hr />
          </div>
        )
      )
    }
    </>
  )
}

export default MyOrderItems
