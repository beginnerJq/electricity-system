export const getUserInfo = key => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo)[key] : null;
};
export const setUserInfo = data => {
  localStorage.setItem('userInfo', JSON.stringify(data));
};
