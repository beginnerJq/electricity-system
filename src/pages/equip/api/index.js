import axios from 'axios';

const searchCondition = (params = {}) => {
  return axios.post('/equipment/searchCondition', params);
};
const equipmentList = params => {
  return axios.post('/equipment/list', params);
};
// 删除设备
const equipmentDelete = params => axios.post('/equipment/delete', params);

export { searchCondition, equipmentList, equipmentDelete };
