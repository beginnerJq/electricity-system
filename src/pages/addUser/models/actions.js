export const GET_ADD_USER = 'GET_ADD_USER';
export const ADD_USER_LOAING = 'ADD_USER_LOAING';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

export const getAddUser = params => {
  return { type: GET_ADD_USER, params };
};
export const addUserLoading = status => {
  return { type: ADD_USER_LOAING, status };
};
export const addUserSuccess = status => {
  return { type: ADD_USER_SUCCESS, status };
};
