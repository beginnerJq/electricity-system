import { axios } from 'utils/axios';

const add = params => {
  return axios.post('/user/add', params);
};

export { add };
