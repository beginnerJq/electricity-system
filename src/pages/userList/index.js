import { lazy } from 'react';
import * as UserListAction from './models/actions';
import UserListState from './models/reducers';
import UserListSaga from './models/saga';

const UserListRoute = [
  {
    path: '/userList',
    exact: true,
    component: lazy(() => import('./UserList')),
    name: '用户列表',
    authorized: [0, 1],
    icon: 'unordered-list',
  },
];

export { UserListRoute, UserListAction, UserListState, UserListSaga };
