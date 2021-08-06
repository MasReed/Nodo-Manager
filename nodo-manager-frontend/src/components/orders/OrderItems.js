import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import { deleteItemInOrder } from '../../reducers/currentOrderReducer'

const OrderItems = ({ setSelectedItem, setShowCustomize }) => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.currentOrder.items)

  const updateItem = (id) => {
    setSelectedItem(items.find((item) => item.uniqueId === id))
    setShowCustomize(true)
  }

  const deleteItem = (id) => {
    dispatch(deleteItemInOrder(id))
  }

  return (
    <>
      {
        (items && items.length > 0) && items.map((item) => (
          <div key={item.uniqueId}>
            <div>

              {/* Item Name, Orderee's Name */}
              <div className='d-flex justify-content-between'>
                <h2 className='my-0 py-2'>{item.baseName}</h2>
                <h2 className='my-0 py-2 text-capitalize'>{item.whos}</h2>
              </div>

              {/* Item Ingrediends & Exclusions */}
              <div className='my-0'>
                <h6 className='my-0 pt-2 pb-1'>Ingredients:</h6>
                <p className='my-0 px-4 py-0'>
                  {item.modIngredients.filter((obj) => obj.checked).map((obj) => obj.ingredient).join(', ')}
                </p>
                <p className='my-0 px-4 py-0'>
                  <small>
                    {`Exclusions: ${item.modIngredients
                      .filter((obj) => !obj.checked)
                      .map((obj) => obj.ingredient)
                      .join(', ')}`}
                  </small>
                </p>

                {/* Display item notes, if any */}
                {
                  item.notes
                  && (
                    <>
                      <h6 className='my-0 py-2'>Notes:</h6>
                      <p className='my-0 px-4 py-0'>{item.notes}</p>
                    </>
                  )
                }
              </div>

              {/* Item Modification Buttons & Item Total */}
              <div className='d-flex justify-content-between'>
                <div className='my-auto'>
                  {/* Remove Item Button */}
                  <Button
                    onClick={() => deleteItem(item.uniqueId)}
                    variant='outline-danger'
                    size='sm'
                    style={{ border: 'hidden' }}
                  >
                    Remove
                  </Button>

                  {/* Edit Item Button */}
                  <Button
                    onClick={() => updateItem(item.uniqueId)}
                    variant='outline-secondary'
                    size='sm'
                    style={{ border: 'hidden' }}
                  >
                    Edit
                  </Button>
                </div>

                {/* Item Total */}
                <p className='my-0 py-2'>
                  {`Item Total: $${item.basePrice}`}
                </p>
              </div>
            </div>
            <hr className='mt-0' />
          </div>
        ))
      }
    </>
  )
}

export default OrderItems
