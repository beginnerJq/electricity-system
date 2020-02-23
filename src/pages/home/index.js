import { lazy } from 'react';
import * as HomeAction from './models/actions';
import HomeState from './models/reducers';
import HomeSaga from './models/saga';

const HomeRoute = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('./Home')),
    name: '首页',
    authorized: [0, 1, 2],
    icon: 'home',
  },
];

export { HomeRoute, HomeAction, HomeState, HomeSaga };
