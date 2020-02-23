export const GET_USER_LIST = Symbol('GET_USER_LIST');
export const SET_USER_LIST = Symbol('SET_USER_LIST');
export const SET_FIELDS = Symbol('SET_FIELDS');
export const GET_USER_INFO = Symbol('GET_USER_INFO');
export const SET_USER_INFO = Symbol('SET_USER_INFO');
export const GET_USER_EDIT = Symbol('GET_USER_EDIT');
export const GET_USER_BIND = Symbol('GET_USER_BIND');
export const SET_USER_BIND = Symbol('SET_USER_BIND');
export const GET_USER_BIND_UPDATE = Symbol('GET_USER_BIND_UPDATE');
export const GET_USER_DELETE = Symbol('GET_USER_DELETE');
export const USER_LIST_LOADING = Symbol('USER_LIST_LOADING');

export const getUserList = params => {
  return { type: GET_USER_LIST, params };
};
export const setUserList = res => {
  return { type: SET_USER_LIST, res };
};
export const setFields = fields => {
  return { type: SET_FIELDS, fields };
};
export const getUserInfo = params => {
  return { type: GET_USER_INFO, params };
};
export const setUserInfo = res => {
  return { type: SET_USER_INFO, res };
};
export const getUserEdit = (params, resolve, reject) => {
  return { type: GET_USER_EDIT, params, resolve, reject };
};
export const getUserBind = params => {
  return { type: GET_USER_BIND, params };
};
export const setUserBind = res => {
  return { type: SET_USER_BIND, res };
};
export const getUserBindUpdate = (params, resolve, reject) => {
  return { type: GET_USER_BIND_UPDATE, params, resolve, reject };
};
export const getUserDelete = (params, resolve, reject) => {
  return { type: GET_USER_DELETE, params, resolve, reject };
};
export const userListLoading = status => {
  return { type: USER_LIST_LOADING, status };
};
