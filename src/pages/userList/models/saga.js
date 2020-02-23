import { put, call, all, fork, takeLeading } from 'redux-saga/effects';
import {
  userList,
  userInfo,
  userEdit,
  userBind,
  userBindUpdate,
  userDelete,
} from '../api';
import {
  GET_USER_LIST,
  GET_USER_INFO,
  GET_USER_EDIT,
  GET_USER_BIND,
  GET_USER_BIND_UPDATE,
  GET_USER_DELETE,
  setFields,
  setUserList,
  setUserInfo,
  setUserBind,
  userListLoading,
} from './actions';

// 获取用户列表
function* getUserList(action) {
  yield put(userListLoading(true));
  try {
    const { code, data } = yield call(userList, action.params);
    if (code == 200) {
      const { pataNum, pageSize, ...rest } = action.params;
      yield put(setFields(rest));
      yield put(setUserList(data));
    }
  } catch {}
  yield put(userListLoading(false));
}
function* watchGetUserList() {
  yield takeLeading(GET_USER_LIST, getUserList);
}

// 获取单个用户信息
function* getUserInfo(action) {
  try {
    const { code, data } = yield call(userInfo, action.params);
    if (code == 200) {
      yield put(setUserInfo(data));
    }
  } catch {}
}
function* watchGetUserInfo() {
  yield takeLeading(GET_USER_INFO, getUserInfo);
}

// 提交修改
function* getUserEdit(action) {
  yield put(userListLoading(true));
  try {
    const { code } = yield call(userEdit, action.params);
    code == 200 ? action.resolve() : action.reject();
  } catch {}
  yield put(userListLoading(false));
}
function* watchGetUserEdit() {
  yield takeLeading(GET_USER_EDIT, getUserEdit);
}

// 获取用户绑定设备
function* getUserBind(action) {
  try {
    const { code, data } = yield call(userBind, action.params);
    if (code == 200) {
      yield put(setUserBind(data));
    }
  } catch {}
}
function* watchGetUserBind() {
  yield takeLeading(GET_USER_BIND, getUserBind);
}

// 更新用户绑定设备
function* getUserBindUpdate(action) {
  yield put(userListLoading(true));
  try {
    const { code } = yield call(userBindUpdate, action.params);
    code == 200 ? action.resolve() : action.reject();
  } catch {}
  yield put(userListLoading(false));
}
function* watchGetUserBindUpdate() {
  yield takeLeading(GET_USER_BIND_UPDATE, getUserBindUpdate);
}

// 删除用户
function* getUserDelete(action) {
  yield put(userListLoading(true));
  try {
    const { code } = yield call(userDelete, action.params);
    code == 200 ? action.resolve() : action.reject();
  } catch {}
  yield put(userListLoading(false));
}
function* watchGetUserDelete() {
  yield takeLeading(GET_USER_DELETE, getUserDelete);
}

export default function*() {
  yield all([
    fork(watchGetUserList),
    fork(watchGetUserInfo),
    fork(watchGetUserEdit),
    fork(watchGetUserBind),
    fork(watchGetUserBindUpdate),
    fork(watchGetUserDelete),
  ]);
}
