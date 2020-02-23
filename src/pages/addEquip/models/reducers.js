import { IS_LOADING, SET_IS_SUCCESS } from './actions';

const initState = {
  isLoading: false,
  isSuccess: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.status };
    case SET_IS_SUCCESS:
      return { ...state, isSuccess: action.status };
    default:
      return state;
  }
};

export default reducer;
