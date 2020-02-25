import { lazy } from 'react';

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

export { LineManageRoute };
