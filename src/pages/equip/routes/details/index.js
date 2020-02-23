import { lazy } from 'react';
import * as DetailsAction from './models/actions';
import DetailsState from './models/reducers';
import DetailsSaga from './models/saga';

const DetailsRoute = [
  {
    path: '/equip/details',
    component: lazy(() => import('./Details')),
    authorized: [0, 1, 2],
    noMenu: true,
  },
];
export { DetailsRoute, DetailsAction, DetailsState, DetailsSaga };
