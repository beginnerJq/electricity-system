import {
  SET_EQUIPMENT,
  SET_EQUIPMENT_LIST,
  SET_TABLE_LOADING,
} from './actions';

const initState = {
  equipmentData: {},
  equipmentListData: {
    pageNum: 1,
    count: 0,
    list: [],
  },
  tableIsLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_EQUIPMENT:
      return { ...state, equipmentData: action.res };
    case SET_EQUIPMENT_LIST:
      return { ...state, equipmentListData: action.res };
    case SET_TABLE_LOADING:
      return { ...state, tableIsLoading: action.status };
    default:
      return state;
  }
};

export default reducer;
