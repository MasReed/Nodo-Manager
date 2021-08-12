import orderService from '../services/orders'

const cartReducer = (state = [], action) => {
  switch (action.type) {
  case 'RESET_CART':
    return []

  case 'ADD_CART_ITEM':
    return [...state, action.data]

  case 'UPDATE_CART_ITEM':
    return state.map((item) => (item.uniqueId !== action.data.uniqueId
      ? item
      : action.data))

  case 'DELETE_CART_ITEM':
    return state.filter((item) => item.uniqueId !== action.data.id)

  default:
    return state
  }
}

export default cartReducer

export const initializeCart = () => async (dispatch) => {
  const cart = await orderService.create()
  dispatch({
    type: 'INIT_CART',
    data: cart,
  })
}

export const addItemToCartActionCreator = (customItem) => async (dispatch) => {
  dispatch({
    type: 'ADD_CART_ITEM',
    data: customItem,
  })
}

export const resetCart = () => async (dispatch) => {
  dispatch({
    type: 'RESET_CART',
  })
}

export const updateCartItemActionCreator = (updatedObject) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_CART_ITEM',
    data: updatedObject,
  })
}

export const deleteCartItemActionCreator = (id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_CART_ITEM',
    data: {
      id,
    },
  })
}
