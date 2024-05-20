const data = [
  {
    id: 'wss-virtual-store-list:add',
    moduleFlag: 'wss-virtual-store-list:add',
    moduleName: '新增库存变更单',
    parentId: 'wss-virtual-store-list',
    moduleUrl: '',
    type: 3,
    icon: null,
    sort: 2,
    children: null,
  },
  {
    id: 'wss-virtual-store-list:view',
    moduleFlag: 'wss-virtual-store-list:view',
    moduleName: '查看',
    parentId: 'wss-virtual-store-list',
    moduleUrl: '',
    type: 3,
    icon: null,
    sort: 1,
    children: null,
  },
];

export function useBtnRights(moduleFlag) {
  function getPageName(btnFlag: string) {
    return btnFlag?.slice(0, btnFlag?.indexOf(':'));
  }
  function getBtnName(btnFlag: string) {
    return btnFlag?.slice(btnFlag?.indexOf(':') + 1);
  }
  const btnMap = {};
  //todo data 接口获取
  data?.map((item) => {
    if (item.moduleFlag) {
      btnMap[getPageName(item.moduleFlag)] = !btnMap[getPageName(item.moduleFlag)]
        ? {
            [getBtnName(item.moduleFlag)]: true,
          }
        : {
            ...btnMap[getPageName(item.moduleFlag)],
            [getBtnName(item.moduleFlag)]: true,
          };
    }
  });
  return btnMap[moduleFlag];
}
