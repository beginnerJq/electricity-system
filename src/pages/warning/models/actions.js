export const GET_ALARM_TYPE = Symbol('GET_ALARM_TYPE');
export const SET_ALARM_TYPE = Symbol('SET_ALARM_TYPE');
export const GET_ALARM_LIST = Symbol('GET_ALARM_LIST');
export const SET_ALARM_LIST = Symbol('SET_ALARM_LIST');
export const SET_TABLE_LOADING = Symbol('SET_TABLE_LOADING');
export const SET_FORM_FIELDS = Symbol('SET_FORM_FIELDS');

export const getAlarmType = () => {
  return { type: GET_ALARM_TYPE };
};
export const setAlarmType = res => {
  return { type: SET_ALARM_TYPE, res };
};
export const getAlarmList = params => {
  return { type: GET_ALARM_LIST, params };
};
export const setAlarmList = res => {
  return { type: SET_ALARM_LIST, res };
};
export const setTableLoading = status => {
  return { type: SET_TABLE_LOADING, status };
};
export const setFormFields = fields => {
  return { type: SET_FORM_FIELDS, fields };
};
