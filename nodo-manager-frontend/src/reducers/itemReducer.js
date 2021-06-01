
const itemReducer = (state = [], action) => {
  switch (action.type) {

    case 'MAKE_ITEM':
      return [...state, action.data]

    case 'UPDATE_ITEM':
      return state.map(item =>
        (item.id !== action.data.id)
        ? item
        : action.data.object
        )

    case 'DELETE_item':
      return state.filter(item => item.id !== action.data.id)

    default:
      return state
  }
}

export default itemReducer

export const newItemActionCreator = (content) => {
  return {
    type: 'MAKE_ITEM',
    data: content
  }
}

export const updateItemActionCreator = (id, updatedObject) => {
  return {
    type: 'UPDATE_ITEM',
    data: {
      id: id,
      object: updatedObject
    }
  }
}

export const destroyItemActionCreator = (id) => {
  return {
    type: 'DESTROY_ITEM',
    data: {
      id: id
    }
  }
}
