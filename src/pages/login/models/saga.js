import { put, call, all, fork, takeLeading } from 'redux-saga/effects';
import { message } from 'antd';
import { setUserInfo } from 'utils/userInfo';
import { isLogin } from 'utils/globalName';
import { history } from 'utils/history';
import {
  GET_CAPTCHA,
  USER_LOGIN,
  CAPTCHA_LOGIN,
  userLoading,
  captchaLoading,
} from './actions';
import { userNameLogin, sendCode, checkCode } from '../api';

//用户名密码登录
function* userLogin(action) {
  try {
    yield put(userLoading(true));
    const { code, data } = yield call(userNameLogin, action.params);
    if (code == 200) {
      message.success('登录成功');
      setUserInfo(data);
      localStorage.setItem(isLogin, 'ok');
      history.push('/');
    }
  } catch {}
  yield put(userLoading(false));
}
function* watchUserLogin() {
  yield takeLeading(USER_LOGIN, userLogin);
}

// 获取验证码
function* getCaptcha(action) {
  try {
    const { code } = yield call(sendCode, action.params);
    if (code == 200) {
      message.success('验证码发送成功');
      action.resolve();
    } else {
      action.reject();
    }
  } catch {
    action.reject();
  }
}
function* watchGetCaptcha() {
  yield takeLeading(GET_CAPTCHA, getCaptcha);
}

// 验证码登录
function* captchaLogin(action) {
  try {
    yield put(captchaLoading(true));
    const { code, data } = yield call(checkCode, action.params);
    if (code == 200) {
      message.success('登录成功');
      setUserInfo(data);
      localStorage.setItem(isLogin, 'ok');
      history.push('/');
    }
  } catch {}
  yield put(captchaLoading(false));
}
function* watchCaptchaLogin() {
  yield takeLeading(CAPTCHA_LOGIN, captchaLogin);
}

export default function*() {
  yield all([
    fork(watchUserLogin),
    fork(watchGetCaptcha),
    fork(watchCaptchaLogin),
  ]);
}
