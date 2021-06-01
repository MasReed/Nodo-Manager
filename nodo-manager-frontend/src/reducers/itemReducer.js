import itemService from '../services/items'

const itemReducer = (state = [], action) => {
  console.log('---itemReducer---')
  console.log('stateB4:', state)
  console.log('action:', action)
  switch (action.type) {

    case 'INIT_ITEMS':
      return action.data

    case 'MAKE_ITEM':
      return [...state, action.data]

    case 'UPDATE_ITEM':
      return state.map(item =>
        (item.id !== action.data.id)
        ? item
        : action.data.object
        )

    case 'DESTROY_ITEM':
      return state.filter(item => item._id !== action.data.id)

    default:
      return state
  }
}

export default itemReducer

export const initializeItems = () => {
  return async dispatch => {
    const items = await itemService.getAll()
    dispatch({
      type: 'INIT_ITEMS',
      data: items
    })
  }
}

export const addItemActionCreator = (newContent) => {
  return async dispatch => {
    const newItem = await itemService.create(newContent)
    console.log(newItem)
    dispatch({
      type: 'MAKE_ITEM',
      data: newItem
    })
  }
}


export const updateItemActionCreator = (id, updatedObject) => {
  return async dispatch => {
    const updatedItem = await itemService.update(id, updatedObject)
    console.log('updated item', updatedItem)
    dispatch({
      type: 'UPDATE_ITEM',
      data: {
        id: id,
        object: updatedObject
      }
    })
  }
}

export const destroyItemActionCreator = (id) => {
  return async dispatch => {
    await itemService.destroy(id)
    dispatch({
      type: 'DESTROY_ITEM',
      data: {
        id: id
      }
    })
  }
}
