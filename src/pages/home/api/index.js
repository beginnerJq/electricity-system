import { axios } from 'utils/axios';

const mapEquipment = () => {
  return axios.post('/index/map/equipment', {});
};
const equipmentList = params => {
  return axios.post('/index/equipmentList', params);
};
const equipmentBaseInfo = params =>
  axios.post('/equipment/map/baseInfo', params);
export { mapEquipment, equipmentList, equipmentBaseInfo };
