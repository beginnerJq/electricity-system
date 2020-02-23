import {
  put,
  call,
  all,
  fork,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';
import { baseInfo, workCondition, curve } from '../api';
import {
  GET_BASE_INFO,
  GET_WORK_CONDITION,
  GET_CURVE,
  isLoading,
  setBaseInfo,
  setWorkCondition,
  setCurve,
} from './actions';
import { action } from 'mobx';

// 获取基本信息
function* getBaseInfo(action) {
  yield put(isLoading(true));
  try {
    const { code, data } = yield call(baseInfo, action.params);
    if (code == 200) {
      yield put(setBaseInfo(data));
    }
  } catch {}
  yield put(isLoading(false));
}
function* watchGetBaseInfo() {
  yield takeLatest(GET_BASE_INFO, getBaseInfo);
}

// 获取工作状态
function* getWorkCondition(action) {
  yield put(isLoading(true));
  try {
    const { code, data } = yield call(workCondition, action.params);
    if (code == 200) {
      yield put(setWorkCondition(data));
    }
  } catch {}
  yield put(isLoading(false));
}
function* watchGetWorkCondition() {
  yield takeLatest(GET_WORK_CONDITION, getWorkCondition);
}

// 获取折线图
function* getCurve(action) {
  try {
    const { code, data } = yield call(curve, action.params);
    if (code == 200) {
      yield put(setCurve(data));
    }
  } catch {}
}
function* watchGetCurve() {
  yield takeLeading(GET_CURVE, getCurve);
}

export default function*() {
  yield all([
    fork(watchGetBaseInfo),
    fork(watchGetWorkCondition),
    fork(watchGetCurve),
  ]);
}
