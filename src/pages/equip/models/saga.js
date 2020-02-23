import { call, put, all, fork, takeLeading } from 'redux-saga/effects';
import {
  GET_SEARCH_CONDITION,
  GET_EQUIPMENT_LIST,
  setSearchCondition,
  setEquipmentList,
  setFormFields,
  setFormLoading,
  setTableLoading,
} from './actions';
import { searchCondition, equipmentList } from '../api';

// 获取查询条件
function* getSearchCondition(action) {
  yield put(setFormLoading(true));
  try {
    const { code, data } = yield call(searchCondition, action.params);
    if (code == 200) {
      yield put(setSearchCondition(data));
    }
  } catch {}
  yield put(setFormLoading(false));
}
function* watchGetSearchCondition() {
  yield takeLeading(GET_SEARCH_CONDITION, getSearchCondition);
}

// 查询列表
function* getEquipmentList(action) {
  yield put(setTableLoading(true));
  try {
    const { code, data } = yield call(equipmentList, action.params);
    if (code == 200) {
      const { pageNum, pageSize, ...rest } = action.params;
      yield put(setFormFields(rest));
      yield put(setEquipmentList(data));
    }
  } catch {}
  yield put(setTableLoading(false));
}
function* watchGetEquipmentList() {
  yield takeLeading(GET_EQUIPMENT_LIST, getEquipmentList);
}

export default function*() {
  yield all([fork(watchGetSearchCondition), fork(watchGetEquipmentList)]);
}
