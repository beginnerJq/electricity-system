export const IS_LOADING = Symbol('IS_LOADING');
export const GET_BASE_INFO = Symbol('GET_BASE_INFO');
export const SET_BASE_INFO = Symbol('SET_BASE_INFO');
export const GET_WORK_CONDITION = Symbol('GET_WORK_CONDITION');
export const SET_WORK_CONDITION = Symbol('SET_WORK_CONDITION');
export const GET_CURVE = Symbol('GET_CURVE');
export const SET_CURVE = Symbol('SET_CURVE');
export const GET_BREAKDOWN_LIST = Symbol('GET_BREAKDOWN_LIST');
export const SET_BREAKDOWN_LIST = Symbol('SET_BREAKDOWN_LIST');
export const GET_BREAKDOWN_CHECK = Symbol('GET_BREAKDOWN_CHECK');

export const isLoading = status => {
  return { type: IS_LOADING, status };
};
export const getBaseInfo = params => {
  return { type: GET_BASE_INFO, params };
};
export const setBaseInfo = res => {
  return { type: SET_BASE_INFO, res };
};
export const getWorkCondition = params => {
  return { type: GET_WORK_CONDITION, params };
};
export const setWorkCondition = res => {
  return { type: SET_WORK_CONDITION, res };
};
export const getCurve = params => {
  return { type: GET_CURVE, params };
};
export const setCurve = res => {
  return { type: SET_CURVE, res };
};
export const getBreakdownList = params => ({
  type: GET_BREAKDOWN_LIST,
  params,
});
export const setBreakdownList = res => ({
  type: SET_BREAKDOWN_LIST,
  res,
});
export const getBreakdownCheck = (params, resolve, reject) => ({
  type: GET_BREAKDOWN_CHECK,
  params,
  resolve,
  reject,
});
