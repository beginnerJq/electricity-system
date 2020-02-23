import { put, call, all, fork, takeLeading } from 'redux-saga/effects';
import { add } from '../api';
import { GET_ADD_USER, addUserLoading, addUserSuccess } from './actions';

function* getAddUser(action) {
  yield put(addUserLoading(true));
  try {
    const { code } = yield call(add, action.params);
    if (code == 200) {
      yield put(addUserSuccess(true));
    }
  } catch {}
  yield put(addUserLoading(false));
}
function* watchGetAddUser() {
  yield takeLeading(GET_ADD_USER, getAddUser);
}

export default function*() {
  yield all([fork(watchGetAddUser)]);
}
