<template>
  <BasicModal
    v-bind="$attrs"
    title="Modal Title"
    :helpMessage="['提示1', '提示2']"
    width="1000px"
    @fullscreen="onFullscreen"
    @ok="hanleOk"
    :destroyOnClose="true"
    @register="register"
  >
    <BasicTable @register="registerTable" ref="selectTable" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, nextTick, watch } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, ColumnChangeParam, useTable } from '@/components/Table';
  import { getBasicColumns } from '../../table/tableData';
  import { demoListApi } from '@/api/demo/table';

  export type Key = string | number;

  const props = defineProps({
    selectData: {
      type: Array<string | number>,
      default: [],
    },
  });

  const objasd = {
    canResize: true,
    title: 'useTable示例',
    titleHelpMessage: '使用useTable调用表格内方法',
    api: demoListApi,
    columns: getBasicColumns(),
    defSort: {
      field: 'name',
      order: 'ascend',
    },
    rowKey: 'id',
    // showTableSetting: true,
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys: [] as Array<string | number>,
    },
    onColumnsChange: (data: ColumnChangeParam[]) => {
      console.log('ColumnsChanged', data);
    },
    // showSelectionBar: true, // 显示多选状态栏
  };
  watch(
    () => props,
    (v) => {
      objasd.rowSelection.selectedRowKeys = props.selectData;
    },
    { immediate: true, deep: true },
  );

  const [register, { closeModal }] = useModalInner();
  //@ts-ignore
  const [registerTable, { getSelectRows, setSelectedRowKeys, getSelectRowKeys }] = useTable(objasd);

  const selectTable = ref<InstanceType<typeof BasicTable> | undefined>();

  const onFullscreen = async () => {
    await nextTick();
    selectTable.value?.redoHeight();
  };
  const hanleOk = async () => {
    console.log(getSelectRows(), '我是确认按钮');
    setSelectedRowKeys(getSelectRowKeys());
    closeModal();
  };
</script>
