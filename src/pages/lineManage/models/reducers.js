import { SET_LINE_LIST, IS_LOADING } from './actions';

const initState = {
  lineList: {
    count: 0,
    pageNum: 1,
    list: [],
  },
  isLoading: false,
};

const reducder = (state = initState, action) => {
  switch (action.type) {
    case SET_LINE_LIST:
      return { ...state, lineList: action.res };
    case IS_LOADING:
      return { ...state, isLoading: action.status };
    default:
      return state;
  }
};

export default reducder;
