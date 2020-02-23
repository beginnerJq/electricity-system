import { axios } from 'utils/axios';

const baseInfo = params => {
  return axios.post('/equipment/baseInfo', params);
};
const workCondition = params => {
  return axios.post('/equipment/workCondition', params);
};
const curve = params => {
  return axios.post('/equipment/curve', params);
};
export { baseInfo, workCondition, curve };
