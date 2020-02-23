export const GET_SEARCH_CONDITION = Symbol('GET_SEARCH_CONDITION');
export const SET_SEARCH_CONDITION = Symbol('SET_SEARCH_CONDITION');
export const GET_EQUIPMENT_LIST = Symbol('GET_EQUIPMENT_LIST');
export const SET_EQUIPMENT_LIST = Symbol('SET_EQUIPMENT_LIST');
export const SET_FORM_FIELDS = Symbol('SET_FORM_FIELDS');
export const SET_FORM_LOADING = Symbol('SET_FORM_LOADING');
export const SET_TABLE_LOADING = Symbol('SET_TABLE_LOADING');

export const getSearchCondition = params => {
  return { type: GET_SEARCH_CONDITION, params };
};
export const setSearchCondition = res => {
  return { type: SET_SEARCH_CONDITION, res };
};
export const getEquipmentList = params => {
  return { type: GET_EQUIPMENT_LIST, params };
};
export const setEquipmentList = res => {
  return { type: SET_EQUIPMENT_LIST, res };
};
export const setFormFields = fields => {
  return { type: SET_FORM_FIELDS, fields };
};
export const setFormLoading = status => {
  return { type: SET_FORM_LOADING, status };
};
export const setTableLoading = status => {
  return { type: SET_TABLE_LOADING, status };
};
