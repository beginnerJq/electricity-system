import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Result, Button } from 'antd';
import { history } from 'utils/history';
import { getUserInfo } from 'utils/userInfo';
import { HomeRoute } from '../pages/home';
import { WarningRoute } from '../pages/warning';
import { EquipRoute, EquipDetailsRoute } from '../pages/equip';
import { AddEquipRoute } from '../pages/addEquip';
import { AddUserRoute } from '../pages/addUser';
import { UserListRoute } from '../pages/userList';
import { LineManageRoute } from '../pages/lineManage';

const allRoutesConfig = [].concat(
  HomeRoute,
  WarningRoute,
  EquipRoute,
  EquipDetailsRoute,
  AddEquipRoute,
  AddUserRoute,
  UserListRoute,
  //LineManageRoute,
);

const Routes = () => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Switch>
        {allRoutesConfig.map(v => {
          const isAuthrized = v.authorized.includes(getUserInfo('type'));
          return (
            <Route
              key={v.path}
              path={v.path}
              component={
                isAuthrized
                  ? v.component
                  : () => (
                      <Result
                        status='403'
                        title='403'
                        subTitle='对不起, 您无权访问此页面'
                        extra={
                          <Button
                            type='primary'
                            onClick={() => history.push('/')}
                          >
                            返回首页
                          </Button>
                        }
                      />
                    )
              }
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
