import { put, call, all, fork, takeLeading } from 'redux-saga/effects';
import { add, equipmentType, findForUpdate, equipmentUpdate } from '../api';
import {
  GET_ADD_EQUIP,
  GET_EQUIPMENT_TYPE,
  GET_FIND_FOR_UPDATE,
  GET_EQUIPMENT_UPDATE,
  setEquipmentType,
  setFindForUpdate,
  isLoading,
  setIsSuccess,
} from './actions';

function* getAddEquip(action) {
  yield put(isLoading(true));
  try {
    const { code } = yield call(add, action.params);
    if (code == 200) {
      yield put(setIsSuccess(true));
    }
  } catch {}
  yield put(isLoading(false));
}
function* watchGetAddEquip() {
  yield takeLeading(GET_ADD_EQUIP, getAddEquip);
}

// 获取设备类型
function* getEquipmentType(action) {
  try {
    const { code, data } = yield call(equipmentType);
    if (code == 200) {
      yield put(setEquipmentType(data));
    }
  } catch {}
}
function* watchGetEquipmentType() {
  yield takeLeading(GET_EQUIPMENT_TYPE, getEquipmentType);
}

// 查询数据
function* getFindForUpdate(action) {
  try {
    const { code, data } = yield call(findForUpdate, action.params);
    if (code == 200) {
      yield put(setFindForUpdate(data));
    }
  } catch {}
}
function* watchGetFindForUpdate() {
  yield takeLeading(GET_FIND_FOR_UPDATE, getFindForUpdate);
}

// 提交修改数据
function* getEquipmentUpdate(action) {
  yield put(isLoading(true));
  try {
    const { code } = yield call(equipmentUpdate, action.params);
    code == 200 ? action.resolve() : action.reject();
  } catch {}
  yield put(isLoading(false));
}
function* watchGetEquipmentUpdate() {
  yield takeLeading(GET_EQUIPMENT_UPDATE, getEquipmentUpdate);
}

export default function*() {
  yield all([
    fork(watchGetAddEquip),
    fork(watchGetEquipmentType),
    fork(watchGetFindForUpdate),
    fork(watchGetEquipmentUpdate),
  ]);
}
