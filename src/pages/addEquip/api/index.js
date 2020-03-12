import { axios } from 'utils/axios';

const add = params => {
  return axios.post('/equipment/add', params);
};
const equipmentType = () => axios.post('/equipment/type', {});
const findForUpdate = params => axios.post('/equipment/findForUpdate', params);
const equipmentUpdate = params => axios.post('/equipment/update', params);

export { add, equipmentType, findForUpdate, equipmentUpdate };
