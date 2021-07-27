import orderService from '../services/orders'

const orderReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_ORDERS':
    return action.data

  case 'CREATE_ORDER':
    return [...state, action.data]

  case 'UPDATE_ORDER':
    // eslint-disable-next-line no-underscore-dangle
    return state.map((order) => ((order._id !== action.data._id)
      ? order
      : action.data))

  case 'DELETE_ORDER':
    // eslint-disable-next-line no-underscore-dangle
    return state.filter((order) => order._id !== action.data.id)

  case 'RESET_ORDERS':
    return []

  default:
    return state
  }
}

export default orderReducer

export const initializeOrders = () => async (dispatch) => {
  const orders = await orderService.getAll()
  dispatch({
    type: 'INIT_ORDERS',
    data: orders,
  })
}

export const addOrderActionCreator = (orderContent) => async (dispatch) => {
  const newOrder = await orderService.create(orderContent)
  dispatch({
    type: 'CREATE_ORDER',
    data: newOrder,
  })
}

export const updateOrderActionCreator = (id, updatedContent) => async (dispatch) => {
  const updatedOrder = await orderService.update(id, updatedContent)
  dispatch({
    type: 'UPDATE_ORDER',
    data: updatedOrder,
  })
}

export const deleteOrderActionCreator = (id) => async (dispatch) => {
  await orderService.destroy(id)
  dispatch({
    type: 'DELETE_ORDER',
    data: {
      id,
    },
  })
}

export const resetOrders = () => ({
  type: 'RESET_ORDERS',
})
