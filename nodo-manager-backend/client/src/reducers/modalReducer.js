const modalReducer = (state = false, action) => {
  /*
    A reducer to keep track if any modal components is currently open or not
  */
  switch (action.type) {
  case 'IS_VISIBLE':
    return action.data

  default:
    return state
  }
}

export default modalReducer

export const isVisible = (visBool) => async (dispatch) => {
  dispatch({
    type: 'IS_VISIBLE',
    data: visBool,
  })
}
