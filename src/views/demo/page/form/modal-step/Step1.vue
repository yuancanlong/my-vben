<template>
  <div class="step1">
    <div class="step1-form"> </div>

    <p class="mb-0px text-center">
      可先下载商品资料查阅可授权的数据，再下载模板文件，整理编辑模板文件后导入模板进行批量订阅。
    </p>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  // import { Button } from '@/components/Button';
  import { step1Schemas } from './data';

  const emit = defineEmits(['next']);

  const [register, { validate }] = useForm({
    labelWidth: 100,
    schemas: step1Schemas,
    actionColOptions: {
      span: 14,
    },
    showResetButton: false,
    submitButtonOptions: {
      text: '下一步',
    },
    submitFunc: customSubmitFunc,
  });

  async function customSubmitFunc() {
    try {
      const values = await validate();
      emit('next', values);
    } catch (error) {
      //
    }
  }
</script>
<style lang="less" scoped>
  .step1 {
    &-form {
      width: 450px;
      margin: 0 auto;
    }
  }
</style>
