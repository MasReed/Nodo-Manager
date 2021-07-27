import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Costs = ({ setCosts }) => {
  const cart = useSelector((state) => state.cart);

  const [subTotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const TAX_RATE = 0.07;

  useEffect(() => {
    if (cart.length > 0) {
      const getSubTotal = cart.map((item) => item.basePrice).reduce((sum, val) => (sum + val));
      const getTaxAmount = Math.round(getSubTotal * TAX_RATE * 100) / 100;
      const getTotal = getSubTotal + getTaxAmount;

      setSubTotal(getSubTotal);
      setTaxAmount(getTaxAmount);
      setTotal(getTotal);

      setCosts({
        getSubTotal,
        taxRate: TAX_RATE,
        getTaxAmount,
        getTotal,
      });
    }
  }, [cart, setCosts]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <div className="mr-2 text-left">
        <h6 className="m-0 p-0">Sub Total:</h6>
        <p className="m-0 p-0"><small>Tax Rate:</small></p>
        <h6 className="m-0 py-0">Tax Amount:</h6>
      </div>
      <div className="ml-2 text-right">
        <h6 className="m-0 p-0">
          $
          {subTotal}
        </h6>
        <p className="m-0 p-0">
          <small>
            x
            {TAX_RATE}
          </small>
        </p>
        <h6 className="m-0 p-0">
          $
          {taxAmount}
        </h6>
      </div>
      <h4 className="m-0 ml-auto mt-auto pt-auto font-weight-bold text-right">
        Total: $
        {total}
      </h4>
    </div>
  );
};

export default Costs;
