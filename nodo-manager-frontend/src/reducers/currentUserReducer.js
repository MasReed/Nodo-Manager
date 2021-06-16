import authServices from '../services/authentications'

const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

const currentUserReducer = (state = storedUser, action) => {
  console.log('=====User=====')
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_USER':
      return action.data

    case 'UNSET_USER':
      return ['no user']

    default:
      return state
  }
}

export default currentUserReducer

export const loginUserActionCreator = (username, password) => {
  console.log('login called')
  return async dispatch => {
    const loggedInUser = await authServices.login(username, password)
    dispatch({
      type: 'SET_USER',
      data: loggedInUser
    })
  }
}

export const setUserActionCreator = (username) => {
  console.log('setUser called')
  return ({
    type: 'SET_USER',
    data: username
    })
  }

export const unsetUserActionCreator = () => {
  console.log('unsetUser called')

  return async dispatch => {
    await authServices.logout()
    dispatch({
      type: 'UNSET_USER'
    })
  }
}
