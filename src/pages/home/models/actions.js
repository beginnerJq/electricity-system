export const GET_EQUIPMENT = Symbol('GET_EQUIPMENT');
export const SET_EQUIPMENT = Symbol('SET_EQUIPMENT');
export const GET_EQUIPMENT_LIST = Symbol('GET_EQUIPMENT_LIST');
export const SET_EQUIPMENT_LIST = Symbol('SET_EQUIPMENT_LIST');
export const SET_TABLE_LOADING = Symbol('SET_TABLE_LOADING');
export const GET_EQUIPMENT_BASE_INFO = Symbol('GET_EQUIPMENT_BASE_INFO');
export const SET_EQUIPMENT_BASE_INFO = Symbol('SET_EQUIPMENT_BASE_INFO');

export const getEquipment = () => {
  return { type: GET_EQUIPMENT };
};
export const setEquipment = res => {
  return { type: SET_EQUIPMENT, res };
};
export const getEquipmentList = params => {
  return { type: GET_EQUIPMENT_LIST, params };
};
export const setEquipmentList = res => {
  return { type: SET_EQUIPMENT_LIST, res };
};
export const setTableLoading = status => {
  return { type: SET_TABLE_LOADING, status };
};
export const getEquipmentBaseInfo = params => ({
  type: GET_EQUIPMENT_BASE_INFO,
  params,
});
export const setEquipmentBaseInfo = res => ({
  type: SET_EQUIPMENT_BASE_INFO,
  res,
});
