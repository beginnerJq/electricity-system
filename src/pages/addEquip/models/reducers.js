import {
  IS_LOADING,
  SET_IS_SUCCESS,
  SET_EQUIPMENT_TYPE,
  SET_FIND_FOR_UPDATE,
} from './actions';

const initState = {
  isLoading: false,
  isSuccess: false,
  equipmentType: [],
  updateData: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.status };
    case SET_IS_SUCCESS:
      return { ...state, isSuccess: action.status };
    case SET_EQUIPMENT_TYPE:
      return { ...state, equipmentType: action.res };
    case SET_FIND_FOR_UPDATE: {
      return { ...state, updateData: action.res };
    }
    default:
      return state;
  }
};

export default reducer;
