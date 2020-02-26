export const GET_LINE_LIST = Symbol('GET_LINE_LIST');
export const SET_LINE_LIST = Symbol('SET_LINE_LIST');
export const IS_LOADING = Symbol('IS_LOADING');

export const getLineList = params => ({ type: GET_LINE_LIST, params });
export const setLineList = res => ({ type: SET_LINE_LIST, res });
export const isLoading = status => ({ type: IS_LOADING, status });
