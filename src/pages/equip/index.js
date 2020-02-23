import { lazy } from 'react';
import * as EquipAction from './models/actions';
import EquipState from './models/reducers';
import EquipSaga from './models/saga';
import { DetailsRoute, DetailsState, DetailsSaga } from './routes';

const EquipRoute = [
  {
    path: '/equip',
    exact: true,
    component: lazy(() => import('./Equip')),
    name: '设备目录',
    authorized: [0, 1, 2],
    icon: 'thunderbolt',
  },
];

export {
  EquipRoute,
  EquipAction,
  EquipState,
  EquipSaga,
  DetailsRoute as EquipDetailsRoute,
  DetailsState as EquipDetailsState,
  DetailsSaga as EquipDetailsSaga,
};
