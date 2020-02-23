import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { LoginState, LoginSaga } from '../pages/login';
import { HomeState, HomeSaga } from '../pages/home';
import { WarningState, WarningSaga } from '../pages/warning';
import {
  EquipState,
  EquipSaga,
  EquipDetailsState,
  EquipDetailsSaga,
} from '../pages/equip';
import { AddEquipState, AddEquipSaga } from '../pages/addEquip';
import { AddUserState, AddUserSaga } from '../pages/addUser';
import { UserListState, UserListSaga } from '../pages/userList';

const rootReducer = combineReducers({
  LoginState,
  HomeState,
  WarningState,
  EquipState,
  EquipDetailsState,
  AddEquipState,
  AddUserState,
  UserListState,
});

function* rootSaga() {
  yield all([
    fork(LoginSaga),
    fork(HomeSaga),
    fork(WarningSaga),
    fork(EquipSaga),
    fork(EquipDetailsSaga),
    fork(AddEquipSaga),
    fork(AddUserSaga),
    fork(UserListSaga),
  ]);
}

export { rootReducer as default, rootSaga };
