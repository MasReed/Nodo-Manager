import userService from '../services/users';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;

    case 'CREATE_USER':
      return [...state, action.data];

    case 'UPDATE_USER':
      return state.map((user) => ((user.id !== action.data.id)
        ? user
        : action.data));

    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.data.id);

    case 'RESET_USERS':
      return [];

    default:
      return state;
  }
};

export default userReducer;

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch({
    type: 'INIT_USERS',
    data: users,
  });
};

export const addUserActionCreator = (newUserObject, currentUser) => async (dispatch) => {
  const newUser = await userService.create(newUserObject);
  if (currentUser !== null) {
    dispatch({
      type: 'CREATE_USER',
      data: newUser,
    });
  }
};

export const updateUserActionCreator = (id, updatedUserObject) => async (dispatch) => {
  const updatedUser = await userService.update(id, updatedUserObject);
  dispatch({
    type: 'UPDATE_USER',
    data: updatedUser,
  });
};

export const deleteUserActionCreator = (id) => async (dispatch) => {
  await userService.destroy(id);
  dispatch({
    type: 'DELETE_USER',
    data: {
      id,
    },
  });
};

export const resetUsers = () => ({
  type: 'RESET_USERS',
});
