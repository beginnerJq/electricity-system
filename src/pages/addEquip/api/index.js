import { axios } from 'utils/axios';

const add = params => {
  return axios.post('/equipment/add', params);
};

export { add };
