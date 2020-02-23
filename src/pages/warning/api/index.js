import { axios } from 'utils/axios';

const alarmType = () => {
  return axios.post('/alarmParam', {});
};
const alarmList = params => {
  return axios.post('/alarmList', params);
};

export { alarmType, alarmList };
