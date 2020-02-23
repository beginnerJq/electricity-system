export const GET_ADD_EQUIP = Symbol('GET_ADD_EQUIP');
export const IS_LOADING = Symbol('IS_LOADING');
export const SET_IS_SUCCESS = Symbol('SET_IS_SUCCESS');

export const getAddEquip = params => {
  return { type: GET_ADD_EQUIP, params };
};
export const isLoading = status => {
  return { type: IS_LOADING, status };
};
export const setIsSuccess = status => {
  return { type: SET_IS_SUCCESS, status };
};
