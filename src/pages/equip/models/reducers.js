import {
  SET_SEARCH_CONDITION,
  SET_EQUIPMENT_LIST,
  SET_FORM_FIELDS,
  SET_FORM_LOADING,
  SET_TABLE_LOADING,
} from './actions';

const initState = {
  searchCondition: {
    province: [],
    city: [],
    county: [],
    line: [],
    pole: [],
    user: [],
    type: [],
  },
  equipmentList: {
    pageNum: 1,
    count: 0,
    list: [],
  },
  formFields: {},
  formLoading: false,
  tableLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SEARCH_CONDITION:
      return { ...state, searchCondition: action.res };
    case SET_EQUIPMENT_LIST:
      return { ...state, equipmentList: action.res };
    case SET_FORM_FIELDS:
      return { ...state, formFields: action.fields };
    case SET_FORM_LOADING:
      return { ...state, formLoading: action.status };
    case SET_TABLE_LOADING:
      return { ...state, tableLoading: action.status };
    default:
      return state;
  }
};

export default reducer;
