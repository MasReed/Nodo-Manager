
const currentUserReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data

    case 'UNSET_USER':
      return []

    default:
      return state
  }
}

export default currentUserReducer
