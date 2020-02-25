import { axios } from 'utils/axios';

const lineAdd = params => axios.post('/equipment/line/add', params);
const lineList = params => axios.post('/equipment/line/list', params);
const lineEdit = params => axios.post('/equipment/line/edit', params);
const lineDetail = params => axios.post('/equipment/line/detail', params);
const lineDelete = params => axios.post('/equipment/line/delete', params);

export { lineAdd, lineList, lineEdit, lineDetail, lineDelete };
