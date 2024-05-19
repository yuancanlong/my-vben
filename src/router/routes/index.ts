import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '@/enums/pageEnum';
import { t } from '@/hooks/web/useI18n';
import data from '../data';
import { LAYOUT } from '@/router/constant';

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeModuleList: AppRouteModule[] = [];
// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key]?.default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

const newData = (item?: any) => {
  return item.map((v) => {
    return {
      children: newData(v.children),
      component: v.moduleUrl?.includes(['list'])
        ? () => import('@/views/demo/comp/button/index.vue')
        : LAYOUT,
      meta: { title: v.moduleName },
      name: v.moduleFlag,
      path: '/' + v.moduleFlag,
      // redirect: v.moduleUrl || '/',
    };
  });
};
const home = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
      },
    },
  ],
};
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];
// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, home, ...newData(data)];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  // redirect: '/',
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
