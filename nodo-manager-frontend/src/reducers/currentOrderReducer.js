import orderService from '../services/orders'

const currentOrderReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_ORDER':
    return action.data

  case 'RESET_ORDER':
    return []

  case 'ADD_ORDER_ITEM':
    return [...state, action.data]

  case 'UPDATE_ORDER_ITEM':
    return state.map((item) => (item.uniqueId !== action.data.uniqueId
      ? item
      : action.data))

  case 'DELETE_ORDER_ITEM':
    return state.filter((item) => item.uniqueId !== action.data.id)

  default:
    return state
  }
}

export default currentOrderReducer

export const setCurrentOrder = () => async (dispatch) => {
  const currentOrder = await orderService.create()
  dispatch({
    type: 'SET_ORDER',
    data: currentOrder,
  })
}

export const resetCurrentOrder = () => async (dispatch) => {
  dispatch({
    type: 'RESET_ORDER',
  })
}

export const addItemToOrder = (customItem) => async (dispatch) => {
  dispatch({
    type: 'ADD_ORDER_ITEM',
    data: customItem,
  })
}

export const updateItemInOrder = (updatedObject) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_ORDER_ITEM',
    data: updatedObject,
  })
}

export const deleteItemInOrder = (id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_ORDER_ITEM',
    data: {
      id,
    },
  })
}
