<template>
  <PageWrapper
    contentFullHeight
    title="基础组件"
    content=" 基础组件依赖于ant-design-vue,组件库已有的基础组件,项目中不会再次进行demo展示（二次封装组件除外）"
  >
    <Row :gutter="[20, 20]">
      <Col :xl="10" :lg="24">
        <Card title="BasicButton Color">
          <div class="my-2">
            <h3>success</h3>
            <div class="py-2">
              <a-button color="success" @click="hanle" @onclick="hanle"> 成功 </a-button>
              <a-button color="success" class="ml-2" disabled> 禁用 </a-button>
              <a-button color="success" class="ml-2" loading> loading </a-button>
              <a-button color="success" type="link" class="ml-2"> link </a-button>
              <a-button color="success" type="link" class="ml-2" loading> loading link </a-button>
              <a-button color="success" type="link" class="ml-2" disabled> disabled link </a-button>
            </div>
          </div>

          <div class="my-2">
            <h3>warning</h3>
            <a-button color="warning"> 警告 </a-button>
            <a-button color="warning" class="ml-2" disabled> 禁用 </a-button>
            <a-button color="warning" class="ml-2" loading> loading </a-button>
            <a-button color="warning" type="link" class="ml-2"> link </a-button>
            <a-button color="warning" type="link" class="ml-2" loading> loading link </a-button>
            <a-button color="warning" type="link" class="ml-2" disabled> disabled link </a-button>
          </div>

          <div class="my-2">
            <h3>error</h3>
            <a-button color="error"> 错误 </a-button>
            <a-button color="error" class="ml-2" disabled> 禁用 </a-button>
            <a-button color="error" class="ml-2" loading> loading </a-button>
            <a-button color="error" type="link" class="ml-2"> link </a-button>
            <a-button color="error" type="link" class="ml-2" loading> loading link </a-button>
            <a-button color="error" type="link" class="ml-2" disabled> disabled link </a-button>
          </div>

          <div class="my-2">
            <h3>ghost</h3>
            <a-button ghost color="success" class="ml-2"> 幽灵成功 </a-button>
            <a-button ghost color="warning" class="ml-2"> 幽灵警告 </a-button>
            <a-button ghost color="error" class="ml-2"> 幽灵错误 </a-button>
            <a-button ghost type="dashed" color="warning" class="ml-2"> 幽灵警告dashed </a-button>
            <a-button ghost danger class="ml-2"> 幽灵危险 </a-button>
          </div>
        </Card>
      </Col>
      <Col :xl="14" :lg="24">
        <Card title="BasicButton Types">
          <div class="my-2">
            <h3>primary</h3>
            <a-button type="primary" preIcon="mdi:page-next-outline"> 主按钮 </a-button>
            <a-button type="primary" class="ml-2" disabled> 禁用 </a-button>
            <a-button type="primary" class="ml-2" danger preIcon="mdi:page-next-outline">
              危险
            </a-button>
            <a-button type="primary" class="ml-2" loading> loading </a-button>
            <a-button type="link" class="ml-2"> link </a-button>
            <a-button type="link" class="ml-2" loading> loading link </a-button>
            <a-button type="link" class="ml-2" disabled> disabled link </a-button>
          </div>

          <div class="my-2">
            <h3>default</h3>
            <a-button type="default"> 默认 </a-button>
            <a-button type="default" class="ml-2" disabled> 禁用 </a-button>
            <a-button type="default" class="ml-2" danger> 危险 </a-button>
            <a-button type="default" class="ml-2" loading> loading </a-button>
            <a-button type="link" class="ml-2"> link </a-button>
            <a-button type="link" class="ml-2" loading> loading link </a-button>
            <a-button type="link" class="ml-2" disabled> disabled link </a-button>
          </div>

          <div class="my-2">
            <h3>dashed</h3>
            <a-button type="dashed"> dashed </a-button>
            <a-button type="dashed" class="ml-2" disabled> 禁用 </a-button>
            <a-button type="dashed" class="ml-2" danger> 危险 </a-button>
            <a-button type="dashed" class="ml-2" loading> loading </a-button>
          </div>

          <div class="my-2">
            <h3>ghost 常规幽灵按钮通常用于有色背景下</h3>
            <div class="bg-gray-400 py-2">
              <a-button ghost type="primary" class="ml-2"> 幽灵主要 </a-button>
              <a-button ghost type="default" class="ml-2"> 幽灵默认 </a-button>
              <a-button ghost type="dashed" class="ml-2"> 幽灵dashed </a-button>
              <a-button ghost type="primary" class="ml-2" disabled> 禁用 </a-button>
              <a-button ghost type="primary" class="ml-2" loading> loading </a-button>
            </div>
            <!-- antd 按钮不能同时使用ghost和link -->
            <!--      <a-button ghost type="link" class="ml-2"> link </a-button>-->
            <!--      <a-button ghost type="link" class="ml-2" loading> loading link </a-button>-->
            <!--      <a-button ghost type="link" class="ml-2" disabled> disabled link </a-button>-->
          </div>
        </Card>
      </Col>
    </Row>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import { Card, Row, Col } from 'ant-design-vue';
  import { router, resetRouter } from '@/router';
  import { useMultipleTabStore } from '@/store/modules/multipleTab';
  import { RouteRecordRaw } from 'vue-router';
  import data from '@/router/data';
  import { LAYOUT } from '@/router/constant';
  import { transformRouteToMenu } from '@/router/helper/menuHelper';
  import { flatMultiLevelRoutes } from '@/router/helper/routeHelper';
  import { usePermissionStore } from '@/store/modules/permission';
  import { asyncRoutes } from '@/router/routes';
  import { useBtnRights } from '@/router/routes/useBtnRights';
  import data1 from '@/router/routes/data1';

  const permissionStore = usePermissionStore();
  const hanle = async () => {
    // 清空tabs
    const tabStore = useMultipleTabStore();
    tabStore.clearCacheTabs();
    // 初始化路由
    // resetRouter();
    // // menus api
    // const newMenuData = (item?: any) => {
    //   return item.map((v) => {
    //     return {
    //       children: v.moduleUrl?.includes(['list']) ? [] : newMenuData(v.children),
    //       component: v.moduleUrl?.includes(['list'])
    //         ? () => import('@/views/demo/comp/card-list/index.vue')
    //         : LAYOUT,
    //       meta: { title: v.moduleName },
    //       name: v.moduleUrl ? v.moduleUrl : v.moduleFlag,
    //       path: '/' + v.moduleFlag,
    //       // redirect: v.moduleUrl || '/',
    //     };
    //   });
    // };
    // // 转换成我们需要的 menus
    // let newMenuList = newMenuData(data);
    // // 将路由转换成菜单
    // const menuList = transformRouteToMenu(newMenuList, true);
    // //菜单赋值
    // permissionStore.setFrontMenuList(menuList);
    // //刷新菜单
    // permissionStore.setLastBuildMenuTime();

    // // menus转换成我们需要的routers
    // const routers = flatMultiLevelRoutes(asyncRoutes);
    // // 将router 数据添加进 路由
    // routers.forEach((route) => {
    //   router.addRoute(route as unknown as RouteRecordRaw);
    // });

    // 根据权限刷新菜单
    let arr: any = [];
    asyncRoutes.forEach((i) => {
      data1.forEach((v) => {
        if (i.name === v.id) {
          arr.push(v);
        }
      });
    });
    const newMenuData = (item?: any) => {
      return item.map((v) => {
        return {
          children: v.moduleUrl?.includes(['list']) ? [] : newMenuData(v.children),
          component: v.moduleUrl?.includes(['list'])
            ? () => import('@/views/demo/comp/card-list/index.vue')
            : LAYOUT,
          meta: { title: v.moduleName },
          name: v.moduleUrl ? v.moduleUrl : v.moduleFlag,
          path: '/' + v.moduleFlag,
          // redirect: v.moduleUrl || '/',
        };
      });
    };
    // // 转换成我们需要的 menus
    let newMenuList = newMenuData(arr);
    const menuList = transformRouteToMenu(newMenuList, true);
    //菜单赋值
    permissionStore.setFrontMenuList(menuList);
    //刷新菜单
    permissionStore.setLastBuildMenuTime();
  };

  useBtnRights('wss-virtual-store-list');
</script>
