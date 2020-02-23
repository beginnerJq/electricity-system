import { lazy } from 'react';
import * as AddEquipAction from './models/actions';
import AddEquipState from './models/reducers';
import AddEquipSaga from './models/saga';

const AddEquipRoute = [
  {
    path: '/addEquip',
    exact: true,
    component: lazy(() => import('./AddEquip')),
    name: '添加设备',
    authorized: [0, 1],
    icon: 'plus-circle',
  },
];

export { AddEquipRoute, AddEquipAction, AddEquipState, AddEquipSaga };
