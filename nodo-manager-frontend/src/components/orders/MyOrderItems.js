import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import { deleteCartItemActionCreator } from '../../reducers/cartReducer';

const MyOrderItems = ({ setSelectedItem, setShowCustomize }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const updateCartItem = (id) => {
    setSelectedItem(cartItems.find((item) => item.uniqueId === id));
    setShowCustomize(true);
  };

  const deleteCartItem = (id) => {
    if (window.confirm('OK to confirm removal')) {
      dispatch(deleteCartItemActionCreator(id));
    }
  };

  return (
    <>
      {
      (cartItems.length > 0) && cartItems.map((item) => (
        <div key={item.uniqueId}>
          <div>
            <div className="d-flex justify-content-between">
              <h2 className="my-0 py-2">{item.baseName}</h2>
              <h2 className="my-0 py-2 text-capitalize">{item.whos}</h2>
            </div>

            <div className="my-0">
              <h6 className="my-0 pt-2 pb-1">Ingredients:</h6>
              <p className="my-0 px-4 py-0">
                {item.modIngredients.filter((obj) => obj.checked).map((obj) => obj.ingredient).join(', ')}
              </p>
              <p className="my-0 px-4 py-0">
                <small>
                  Exclusions:&nbsp;
                  {item.modIngredients.filter((obj) => !obj.checked).map((obj) => obj.ingredient).join(', ')}
                </small>
              </p>
              {
                  item.notes
                  && (
                  <>
                    <h6 className="my-0 py-2">Notes:</h6>
                    <p className="my-0 px-4 py-0">{item.notes}</p>
                  </>
                  )
                }
            </div>

            <div className="d-flex justify-content-between">
              <div className="my-auto">
                <Button
                  onClick={() => deleteCartItem(item.uniqueId)}
                  variant="outline-danger"
                  size="sm"
                  style={{ border: 'hidden' }}
                >
                  Remove
                </Button>
                <Button
                  onClick={() => updateCartItem(item.uniqueId)}
                  variant="outline-secondary"
                  size="sm"
                  style={{ border: 'hidden' }}
                >
                  Edit
                </Button>
              </div>
              <p className="my-0 py-2">
                Item Total: $
                {item.basePrice}
              </p>
            </div>
          </div>
          <hr className="mt-0" />
        </div>
      ))
    }
    </>
  );
};

export default MyOrderItems;
