import {
  put,
  call,
  all,
  fork,
  takeLeading,
  takeLatest,
} from 'redux-saga/effects';
import {
  GET_EQUIPMENT,
  GET_EQUIPMENT_LIST,
  GET_EQUIPMENT_BASE_INFO,
  setEquipment,
  setEquipmentList,
  setTableLoading,
  setEquipmentBaseInfo,
} from './actions';
import { mapEquipment, equipmentList, equipmentBaseInfo } from '../api';

// 获取设备坐标,线路
function* getEquipment(action) {
  try {
    const { code, data } = yield call(mapEquipment);
    if (code == 200) {
      yield put(setEquipment(data));
      yield put({
        type: GET_EQUIPMENT_LIST,
        params: { pageNum: 1, pageSize: 10 },
      });
    }
  } catch {}
}
function* watchGetEquipment() {
  yield takeLeading(GET_EQUIPMENT, getEquipment);
}

// 设备列表
function* getEquipmentList(action) {
  yield put(setTableLoading(true));
  try {
    const { code, data } = yield call(equipmentList, action.params);
    if (code == 200) {
      yield put(setEquipmentList(data));
    }
  } catch {}
  yield put(setTableLoading(false));
}
function* watchGetEquipmentList() {
  yield takeLeading(GET_EQUIPMENT_LIST, getEquipmentList);
}

// 获取单个设备详细信息
function* getEquipmentBaseInfo(action) {
  try {
    const { code, data } = yield call(equipmentBaseInfo, action.params);
    if (code == 200) {
      yield put(setEquipmentBaseInfo(data));
    }
  } catch {}
}
function* watchGetEquipmentBaseInfo() {
  yield takeLatest(GET_EQUIPMENT_BASE_INFO, getEquipmentBaseInfo);
}
export default function*() {
  yield all([
    fork(watchGetEquipment),
    fork(watchGetEquipmentList),
    fork(watchGetEquipmentBaseInfo),
  ]);
}
