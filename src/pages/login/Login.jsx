import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from 'antd';
import { LoginAction } from './index';
import UserComponent from './components/UserComponent';
import MobileComponent from './components/MobileComponent';
import styles from './Login.pcss';
import './Login.css';

const { TabPane } = Tabs;

const Login = props => {
  const { state, action } = props;
  return (
    <div styleName='styles.login-container'>
      <div id='bg-wrap'></div>
      <div styleName='styles.login-wrap' id='login-wrap'>
        <h1>输电线路分布式故障诊断系统</h1>
        <Tabs>
          <TabPane key='userlogin' tab='用户名登录'>
            <UserComponent
              loading={state.userLoading}
              userLogin={action.userLogin}
            />
          </TabPane>
          <TabPane key='mobilelogin' tab='手机号登录'>
            <MobileComponent
              loading={state.captchaLoading}
              getCaptcha={action.getCaptcha}
              captchaLogin={action.captchaLogin}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { state: state.LoginState };
};
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getCaptcha: LoginAction.getCaptcha,
        userLogin: LoginAction.userLogin,
        captchaLogin: LoginAction.captchaLogin,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
