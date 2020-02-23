import { lazy } from 'react';
import * as AddUserAction from './models/actions';
import AddUserState from './models/reducers';
import AddUserSaga from './models/saga';

const AddUserRoute = [
  {
    path: '/addUser',
    exact: true,
    component: lazy(() => import('./AddUser')),
    name: '添加用户',
    authorized: [0, 1],
    icon: 'user-add',
  },
];

export { AddUserRoute, AddUserAction, AddUserState, AddUserSaga };
