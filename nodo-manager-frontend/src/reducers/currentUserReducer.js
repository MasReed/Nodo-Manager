import authServices from '../services/authentications'

const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

const currentUserReducer = (state = storedUser, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data

    case 'UNSET_USER':
      return null

    default:
      return state
  }
}

export default currentUserReducer

export const loginUserActionCreator = (username, password) => {
  return async dispatch => {
    const loggedInUser = await authServices.login(username, password)
    dispatch({
      type: 'SET_USER',
      data: loggedInUser
    })
  }
}

export const logoutUserActionCreator = () => {
  return async dispatch => {
    await authServices.logout()
    dispatch({
      type: 'UNSET_USER'
    })
  }
}
