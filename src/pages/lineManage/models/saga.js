import { put, call, all, fork, takeLeading } from 'redux-saga/effects';
import { lineList } from '../api';
import { GET_LINE_LIST, setLineList, isLoading } from './actions';

// 获取线路列表
function* getLineList(action) {
  yield put(isLoading(true));
  try {
    const { code, data } = yield call(lineList, action.params);
    if (code == 200) {
      yield put(setLineList(data));
    }
  } catch {}
  yield put(isLoading(false));
}
function* watchGetLineList() {
  yield takeLeading(GET_LINE_LIST, getLineList);
}

export default function*() {
  yield all([fork(watchGetLineList)]);
}
