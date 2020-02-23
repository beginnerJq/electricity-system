import { lazy } from 'react';
import * as WarningAction from './models/actions';
import WarningState from './models/recuers';
import WarningSaga from './models/saga';

const WarningRoute = [
  {
    path: '/warning',
    component: lazy(() => import('./Warning')),
    name: '预警信息报表',
    authorized: [0, 1, 2],
    icon: 'bell',
  },
];

export { WarningRoute, WarningAction, WarningState, WarningSaga };
