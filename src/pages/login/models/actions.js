export const GET_CAPTCHA = 'GET_CAPTCHA';
export const USER_LOGIN = 'USER_LOGIN';
export const CAPTCHA_LOGIN = 'CAPTCHA_LOGIN';
export const USER_LOADING = 'USER_LOADING';
export const CAPTCHA_LOADING = 'CAPTCHA_LOADING';

export const getCaptcha = (params, resolve, reject) => {
  return { type: GET_CAPTCHA, params, resolve, reject };
};
export const userLogin = params => {
  return { type: USER_LOGIN, params };
};
export const captchaLogin = params => {
  return { type: CAPTCHA_LOGIN, params };
};
export const userLoading = status => {
  return { type: USER_LOADING, status };
};
export const captchaLoading = status => {
  return { type: CAPTCHA_LOADING, status };
};
