import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Result, Button } from 'antd';
import { history } from 'utils/history';
import { HomeRoute } from '../pages/home';
import { WarningRoute } from '../pages/warning';
import { EquipRoute, EquipDetailsRoute } from '../pages/equip';
import { AddEquipRoute } from '../pages/addEquip';
import { AddUserRoute } from '../pages/addUser';
import { UserListRoute } from '../pages/userList';

const allRoutesConfig = [].concat(
  HomeRoute,
  WarningRoute,
  EquipRoute,
  EquipDetailsRoute,
  AddEquipRoute,
  AddUserRoute,
  UserListRoute,
);

const Routes = () => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Switch>
        {allRoutesConfig.map(v => {
          return (
            <Route
              key={v.path}
              path={v.path}
              component={v.component}
              exact={v.exact}
            />
          );
        })}
        <Route
          render={() => (
            <Result
              status='404'
              title='404'
              subTitle='对不起,您访问的页面不存在.'
              extra={
                <Button type='primary' onClick={() => history.push('/')}>
                  返回首页
                </Button>
              }
            />
          )}
        />
      </Switch>
    </Suspense>
  );
};

export { allRoutesConfig };
export default Routes;
