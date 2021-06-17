import authServices from '../services/authentications'
import itemService from '../services/items'
import orderService from '../services/orders'
import userService from '../services/users'

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
    itemService.setToken(loggedInUser.accessToken)
    orderService.setToken(loggedInUser.accessToken)
    userService.setToken(loggedInUser.accessToken)
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

export const guestUserActionCreator = () => {
  return ({
    type: 'SET_USER',
    data: {
      username: 'Guest'
    }
  })
}
