const alertReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.data;

    case 'UNSET_ALERT': {
      return null;
    }
    default:
      return state;
  }
};

export default alertReducer;

/* Display colored banner with message for user to see for 5 seconds */
let timerId = null;
export const toastAlertCreator = (alertObject) => {
  clearTimeout(timerId);

  return async (dispatch) => {
    dispatch({
      type: 'SET_ALERT',
      data: alertObject,
    });
    timerId = setTimeout(() => dispatch({ type: 'UNSET_ALERT' }), 4500);
  };
};
