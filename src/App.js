import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { history } from 'utils/history';
import { Authorized } from 'components';
import Layout from './layout/Layout';
import { Login } from './pages/login';
import store from './store';

const App = () => (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login} />
          <Authorized>
            <Layout />
          </Authorized>
        </Switch>
      </Router>
    </Provider>
  </ConfigProvider>
);

export default hot(App);
