export const GET_ADD_EQUIP = Symbol('GET_ADD_EQUIP');
export const IS_LOADING = Symbol('IS_LOADING');
export const SET_IS_SUCCESS = Symbol('SET_IS_SUCCESS');
export const GET_EQUIPMENT_TYPE = Symbol('GET_EQUIPMENT_TYPE');
export const SET_EQUIPMENT_TYPE = Symbol('SET_EQUIPMENT_TYPE');
export const GET_FIND_FOR_UPDATE = Symbol('GET_FIND_FOR_UPDATE');
export const SET_FIND_FOR_UPDATE = Symbol('SET_FIND_FOR_UPDATE');
export const GET_EQUIPMENT_UPDATE = Symbol('GET_EQUIPMENT_UPDATE');

export const getAddEquip = params => {
  return { type: GET_ADD_EQUIP, params };
};
export const isLoading = status => {
  return { type: IS_LOADING, status };
};
export const setIsSuccess = status => {
  return { type: SET_IS_SUCCESS, status };
};
export const getEquipmentType = () => ({ type: GET_EQUIPMENT_TYPE });
export const setEquipmentType = res => ({ type: SET_EQUIPMENT_TYPE, res });
export const getFindForUpdate = params => ({
  type: GET_FIND_FOR_UPDATE,
  params,
});
export const setFindForUpdate = res => ({
  type: SET_FIND_FOR_UPDATE,
  res,
});
export const getEquipmentUpdate = (params, resolve, reject) => ({
  type: GET_EQUIPMENT_UPDATE,
  params,
  resolve,
  reject,
});
