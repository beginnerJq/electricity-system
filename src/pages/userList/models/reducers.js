import {
  SET_USER_LIST,
  SET_FIELDS,
  SET_USER_INFO,
  SET_USER_BIND,
  USER_LIST_LOADING,
} from './actions';

const initState = {
  userList: {
    pageNum: 1,
    count: 0,
    list: [],
  },
  fields: {},
  userInfo: {},
  userBind: {
    bind: [],
    notBind: [],
  },
  isLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return { ...state, userList: action.res };
    case SET_FIELDS:
      return { ...state, fields: action.fields };
    case SET_USER_INFO:
      return { ...state, userInfo: action.res };
    case SET_USER_BIND:
      return { ...state, userBind: action.res };
    case USER_LIST_LOADING:
      return { ...state, isLoading: action.status };
    default:
      return state;
  }
};

export default reducer;
