import { put, call, all, fork, takeLeading } from 'redux-saga/effects';
import { add } from '../api';
import { GET_ADD_EQUIP, isLoading, setIsSuccess } from './actions';

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

export default function*() {
  yield all([fork(watchGetAddEquip)]);
}
