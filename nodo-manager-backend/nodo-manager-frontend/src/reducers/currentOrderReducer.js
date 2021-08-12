import orderService from '../services/orders'

const currentOrderReducer = (state = { items: [], isUpdating: false }, action) => {
  switch (action.type) {
  case 'INIT_ORDER':
    return action.data

  case 'SET_ORDER':
    return action.data

  case 'RESET_ORDER':
    return { items: [], isUpdating: false }

  case 'ADD_ORDER_ITEM':
    return {
      ...state,
      items: [
        ...state.items, action.data,
      ],
    }

  case 'UPDATE_ORDER_ITEM':
    return {
      ...state,
      items: [
        ...state.items.map((item) => (item.uniqueId !== action.data.uniqueId
          ? item
          : action.data)),
      ],
    }

  case 'DELETE_ORDER_ITEM':
    return {
      ...state,
      items: [
        ...state.items.filter((item) => item.uniqueId !== action.data.id),
      ],
    }

  case 'SET_ORDER_UPDATING':
    return {
      ...state,
      isUpdating: action.data,
    }

  default:
    return state
  }
}

export default currentOrderReducer

export const initializeCurrentOrder = () => async (dispatch) => {
  const currentOrder = await orderService.create()
  dispatch({
    type: 'INIT_ORDER',
    data: currentOrder,
  })
}

export const setCurrentOrder = (orderObject) => async (dispatch) => {
  dispatch({
    type: 'SET_ORDER',
    data: orderObject,
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

export const setOrderUpdating = (isUpdating) => async (dispatch) => {
  dispatch({
    type: 'SET_ORDER_UPDATING',
    data: isUpdating,
  })
}
