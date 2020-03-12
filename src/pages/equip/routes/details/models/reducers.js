import {
  IS_LOADING,
  SET_BASE_INFO,
  SET_WORK_CONDITION,
  SET_CURVE,
  SET_BREAKDOWN_LIST,
} from './actions';

const initState = {
  isLoading: false,
  baseInfo: {},
  workCondition: {},
  curve: {
    data: '',
  },
  breakdownList: {
    pageNum: 10,
    count: 0,
    list: [],
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.status };
    case SET_BASE_INFO:
      return { ...state, baseInfo: action.res };
    case SET_WORK_CONDITION:
      return { ...state, workCondition: action.res };
    case SET_CURVE:
      return { ...state, curve: action.res };
    case SET_BREAKDOWN_LIST:
      return { ...state, breakdownList: action.res };
    default:
      return state;
  }
};

export default reducer;
