import authServices from '../services/authentications'

const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data

    case 'UNSET_USER':
      console.log('unset called')
      return []

    default:
      return state
  }
}

export default currentUserReducer

export const unsetUserActionCreator = () => {
  console.log('unsetUser called')
  authServices.logout()
  return ({
  type: 'UNSET_USER'
  })
  // return async dispatch => {
  //   await authServices.logout()
  //   console.log('unset return dispatch')
  //   dispatch({
  //   type: 'UNSET_USER'
  //   })
  // }
}
