import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import OrderInfo from './OrderInfo';

const OrdersList = () => {
  const orders = useSelector((state) => state.orders);

  //
  const [sortedOrders, setSortedOrders] = useState(orders);

  //
  useEffect(() => {
    const timeSortedOrders = sortByUpdatedTime(orders);
    const statusSortedOrders = sortByStatus(timeSortedOrders);

    setSortedOrders(statusSortedOrders);
  }, [orders]);

  //
  const sortByUpdatedTime = (ordersArray, ascending = true) => ordersArray.slice().sort((a, b) => {
    if (ascending) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  });

  //
  const sortByStatus = (ordersArray) => {
    const sortBy = ['In Progress', 'Complete'];
    return ordersArray.slice().sort((a, b) => (
      sortBy.indexOf(a.status) - sortBy.indexOf(b.status)
    ));
  };

  return (
    <>
      {
        orders && sortedOrders.map((order) => <OrderInfo key={order._id} order={order} />)
      }
    </>
  );
};

export default OrdersList;
