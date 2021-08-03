import itemService from '../services/items'

const itemReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_ITEMS':
    return action.data

  case 'MAKE_ITEM':
    return [...state, action.data]

  case 'UPDATE_ITEM':
    return state.map((item) => ((item._id !== action.data._id)
      ? item
      : action.data))

  case 'DESTROY_ITEM':
    return state.filter((item) => item._id !== action.data.id)

  case 'RESET_ITEMS':
    return []

  default:
    return state
  }
}

export default itemReducer

export const initializeItems = () => async (dispatch) => {
  const items = await itemService.getAll()
  dispatch({
    type: 'INIT_ITEMS',
    data: items,
  })
}

export const addItemActionCreator = (newContent) => async (dispatch) => {
  const newItem = await itemService.create(newContent)
  dispatch({
    type: 'MAKE_ITEM',
    data: newItem,
  })
}

export const updateItemActionCreator = (id, updatedObject) => async (dispatch) => {
  const updatedItem = await itemService.update(id, updatedObject)
  dispatch({
    type: 'UPDATE_ITEM',
    data: updatedItem,
  })
}

export const destroyItemActionCreator = (id) => async (dispatch) => {
  await itemService.destroy(id)
  dispatch({
    type: 'DESTROY_ITEM',
    data: {
      id,
    },
  })
}

export const resetItems = () => ({
  type: 'RESET_ITEMS',
})
