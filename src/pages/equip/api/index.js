import axios from 'axios';

const searchCondition = (params = {}) => {
  return axios.post('/equipment/searchCondition', params);
};
const equipmentList = params => {
  return axios.post('/equipment/list', params);
};

export { searchCondition, equipmentList };
