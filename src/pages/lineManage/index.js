import { lazy } from 'react';
import * as LineManageAction from './models/actions';
import LineManageState from './models/reducers';
import LineManageSaga from './models/saga';

const LineManageRoute = [
  {
    path: '/lineManage',
    exact: true,
    component: lazy(() => import('./LineManage')),
    name: '线路管理',
    authorized: [0, 1],
    icon: 'control',
  },
];

export { LineManageRoute, LineManageAction, LineManageState, LineManageSaga };
