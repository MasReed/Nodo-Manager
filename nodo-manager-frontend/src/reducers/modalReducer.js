const modalReducer = (state = false, action) => {
  switch (action.type) {
  case 'IS_VISIBLE':
    return action.data

  default:
    return state
  }
}

export default modalReducer

export const setVisible = () => async (dispatch) => {
  dispatch({
    type: 'IS_VISIBLE',
    data: true,
  })
}

export const setHidden = () => async (dispatch) => {
  dispatch({
    type: 'IS_VISIBLE',
    data: false,
  })
}
