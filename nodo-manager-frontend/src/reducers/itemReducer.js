
const itemReducer = (state = [], action) => {
  switch (action.type) {

    case 'MAKE_ITEM':
      return [...state, action.data]

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
