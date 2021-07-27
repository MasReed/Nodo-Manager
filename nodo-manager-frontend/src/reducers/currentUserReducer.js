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

export const loginUserActionCreator = (username, password) => async (dispatch) => {
  const loggedInUser = await authServices.login(username, password)
  itemService.setToken(loggedInUser.accessToken)
  orderService.setToken(loggedInUser.accessToken)
  userService.setToken(loggedInUser.accessToken)
  dispatch({
    type: 'SET_USER',
    data: loggedInUser,
  })
}

export const logoutUserActionCreator = () => async (dispatch) => {
  await authServices.logout()
  itemService.setToken(null)
  orderService.setToken(null)
  userService.setToken(null)
  dispatch({
    type: 'UNSET_USER',
  })
}

export const guestUserActionCreator = () => ({
  type: 'SET_USER',
  data: {
    username: 'Guest',
  },
})
