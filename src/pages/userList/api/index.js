import { axios } from 'utils/axios';

const userList = params => {
  return axios.post('/user/list', params);
};
const userInfo = params => {
  return axios.post('/user/info', params);
};
const userEdit = params => {
  return axios.post('/user/edit', params);
};
const userBind = params => {
  return axios.post('/user/bind', params);
};
const userBindUpdate = params => {
  return axios.post('/user/bind/update', params);
};
const userDelete = params => {
  return axios.post('/user/bind/delete', params);
};

export { userList, userInfo, userEdit, userBind, userBindUpdate, userDelete };
