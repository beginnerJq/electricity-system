import axios from 'axios';
import { message } from 'antd';
import { history } from './history';
import { getUserInfo, setUserInfo } from './userInfo';
import { isLogin } from './globalName';

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 不发送token的地址
const filterURL = ['/auth/login', '/auth/sendCode', '/auth/checkCode'];

axios.interceptors.request.use(
  function(config) {
    if (!filterURL.includes(config.url)) {
      config.headers = { token: getUserInfo('token') };
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  function(response) {
    const { data } = response;
    if (data.code != 200) {
      // 错误显示错误信息
      message.error(data.message);
    }
    if (data.code == 500001) {
      // 登录过期
      localStorage.removeItem(isLogin);
      setUserInfo(); // 删除用户信息
      history.push('/login'); // 跳转登录页
      return Promise.reject(500001);
    }
    return data;
  },
  function(error) {
    message.error('网络错误!');
    return Promise.reject(error);
  },
);

export { axios };
