import { put, call, all, fork, takeLeading, select } from 'redux-saga/effects';
import { alarmType, alarmList } from '../api';
import {
  GET_ALARM_TYPE,
  GET_ALARM_LIST,
  setAlarmType,
  setAlarmList,
  setFormFields,
  setTableLoading,
} from './actions';

// 获取预警报表类型
function* getAlarmType() {
  yield put(setTableLoading(true));
  try {
    const { code, data } = yield call(alarmType);
    if (code == 200) {
      yield put(setAlarmType(data));
    }
    const {
      WarningState: { formFields },
    } = yield select();
    yield put({
      type: GET_ALARM_LIST,
      params: { pageNum: 1, ...formFields },
    });
  } catch {}
}
function* watchGetAlarmType() {
  yield takeLeading(GET_ALARM_TYPE, getAlarmType);
}

// 获取列表数据
function* getAlarmList(action) {
  yield put(setTableLoading(true));
  try {
    const { code, data } = yield call(alarmList, action.params);
    if (code == 200) {
      const { pageNum, pageSize, ...rest } = action.params;
      yield put(setFormFields(rest));
      yield put(setAlarmList(data));
    }
  } catch {}
  yield put(setTableLoading(false));
}
function* watchGetAlarmList() {
  yield takeLeading(GET_ALARM_LIST, getAlarmList);
}

export default function*() {
  yield all([fork(watchGetAlarmType), fork(watchGetAlarmList)]);
}
