import { USER_LOADING, CAPTCHA_LOADING } from './actions';

const initState = {
  userLoading: false,
  captchaLoading: false,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, userLoading: action.status };
    case CAPTCHA_LOADING:
      return { ...state, captchaLoading: action.status };
    default:
      return state;
  }
};
export default reducer;
