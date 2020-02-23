import {
  SET_ALARM_TYPE,
  SET_ALARM_LIST,
  SET_TABLE_LOADING,
  SET_FORM_FIELDS,
} from './actions';

const initState = {
  alarmType: [],
  alarmList: {
    pageNum: 1,
    count: 0,
    list: [],
  },
  formFields: {
    type: '',
    time: undefined,
    cmdId: '',
    orderBy: 0,
  },
  tableIsLoading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALARM_TYPE:
      return { ...state, alarmType: action.res };
    case SET_ALARM_LIST:
      return { ...state, alarmList: action.res };
    case SET_FORM_FIELDS:
      return { ...state, formFields: action.fields };
    case SET_TABLE_LOADING:
      return { ...state, tableIsLoading: action.status };
    default:
      return state;
  }
};

export default reducer;
