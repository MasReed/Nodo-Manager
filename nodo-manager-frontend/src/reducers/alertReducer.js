
const alertReducer = (state = { message: 'hi', variant: 'secondary' }, action) => {
  switch (action.type) {

  case 'SET_ALERT': {
    const setObj = {
      message: action.message,
      variant: action.variant
    }
    return setObj
  }
  case 'UNSET_ALERT': {
    const resetObj = {
      message: '',
      variant: 'secondary'
    }
    return resetObj
  }
  default:
    return state
  }
}

export default alertReducer

/* Display colored banner with message for user to see for 5 seconds */
let timerId = null
export const toastAlertCreator = (message, variant) => {
  clearTimeout(timerId)

  return async dispatch => {
    dispatch({
      type: 'SET_ALERT',
      message,
      variant
    })
    timerId = setTimeout(() => dispatch({ type: 'UNSET_ALERT' }), 5000)
  }
}
