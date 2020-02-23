import { ADD_USER_LOAING, ADD_USER_SUCCESS } from './actions';

const initState = {
  isLoading: false,
  isSuccess: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_USER_LOAING:
      return { ...state, isLoading: action.status };
    case ADD_USER_SUCCESS:
      return { ...state, isSuccess: action.status };
    default:
      return state;
  }
};

export default reducer;
