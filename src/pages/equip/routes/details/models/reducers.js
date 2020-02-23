import {
  IS_LOADING,
  SET_BASE_INFO,
  SET_WORK_CONDITION,
  SET_CURVE,
} from './actions';

const initState = {
  isLoading: false,
  baseInfo: {},
  workCondition: {},
  curve: {
    data: '',
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
    default:
      return state;
  }
};

export default reducer;
