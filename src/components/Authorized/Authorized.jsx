import React from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import { isLogin } from 'utils/globalName';
import { getUserInfo } from 'utils/userInfo';

const Authorized = props => {
  const { children } = props;
  if (!localStorage.getItem(isLogin) || !getUserInfo('token')) {
    message.warn('请重新登录!');
    return <Redirect to='/login' />;
  }
  return React.cloneElement(children);
};

export default Authorized;
