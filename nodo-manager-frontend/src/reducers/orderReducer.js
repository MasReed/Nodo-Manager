import orderService from '../services/orders'

const orderReducer = (state = [], action) => {
  switch (action.type) {

    case 'INIT_ORDERS':
      return action.data

    case 'CREATE_ORDER':
      return [...state, action.data]

    case 'UPDATE_ORDER':
      return state.map(order =>
        (order._id !== action.data._id)
        ? order
        : action.data
      )

    case 'DELETE_ORDER':
      return state.filter(order => order._id !== action.data.id)

    case 'RESET_ORDERS':
      return []

    default:
      return state
  }
}

export default orderReducer

export const initializeOrders = () => {
  return async dispatch => {
    const orders = await orderService.getAll()
    dispatch({
      type: 'INIT_ORDERS',
      data: orders
    })
  }
}

export const addOrderActionCreator = (orderContent) => {
  return async dispatch => {
    const newOrder = await orderService.create(orderContent)
    dispatch({
      type: 'CREATE_ORDER',
      data: newOrder
    })
  }
}

export const updateOrderActionCreator = (id, updatedContent) => {
  return async dispatch => {
    const updatedOrder = await orderService.update(id, updatedContent)
    dispatch({
      type: 'UPDATE_ORDER',
      data: updatedOrder
    })
  }
}

export const deleteOrderActionCreator = (id) => {
  return async dispatch => {
    await orderService.destroy(id)
    dispatch({
      type: 'DELETE_ORDER',
      data: {
        id: id
      }
    })
  }
}

export const resetOrders = () => {
  return ({
    type: 'RESET_ORDERS'
  })
}
