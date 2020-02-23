import { axios } from 'utils/axios';

const userNameLogin = params => {
  return axios.post('/auth/login', params);
};
const sendCode = params => {
  return axios.post('/auth/sendCode', params);
};
const checkCode = params => {
  return axios.post('/auth/checkCode', params);
};
export { userNameLogin, sendCode, checkCode };
