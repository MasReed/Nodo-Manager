import orderService from '../services/orders'

const cartReducer = (state = [], action) => {
  // console.log('---cartReducer---')
  // console.log('stateB4:', state)
  // console.log('action:', action)
  switch (action.type) {

    case 'INIT_CART':
      return action.data

    case 'ADD_CART_ITEM':
      return [...state, action.data]

    case 'UPDATE_CART_ITEM':
      return state.map(item =>
        (item._id !== action.data._id)
        ? item
        : action.data
      )

    case 'DESTROY_CART_ITEM':
      return state.filter(item => item._id !== action.data.id)

    default:
      return state
  }
}

export default cartReducer

export const initializeCart = () => {
  return async dispatch => {
    const cart = await orderService.create()
    dispatch({
      type: 'INIT_CART',
      data: cart
    })
  }
}

export const addItemToCartActionCreator = (customItem) => {
  return async dispatch => {
    // const newItem = await Service.create(newContent)
    dispatch({
      type: 'ADD_CART_ITEM',
      data: customItem
    })
  }
}

// export const updateItemActionCreator = (id, updatedObject) => {
//   return async dispatch => {
//     const updatedItem = await itemService.update(id, updatedObject)
//     dispatch({
//       type: 'UPDATE_ITEM',
//       data: updatedItem
//     })
//   }
// }
//
// export const destroyItemActionCreator = (id) => {
//   return async dispatch => {
//     await itemService.destroy(id)
//     dispatch({
//       type: 'DESTROY_ITEM',
//       data: {
//         id: id
//       }
//     })
//   }
// }
