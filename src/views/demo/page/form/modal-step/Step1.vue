<template>
  <div class="step1">
    <div class="step1-form">
      <Button type="default" class="mt-16px">下载导入模板</Button>
      <Button type="link" class="mt-32px mb-8px">下载商品资料</Button>
    </div>

    <p class="mb-0px text-center">
      可先下载商品资料查阅可授权的数据，再下载模板文件，整理编辑模板文件后导入模板进行批量订阅。
    </p>

    <Button type="primary" class="mt-32px" @click="emit('next')">下一步</Button>
  </div>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';

  const emit = defineEmits(['next']);
</script>
<style lang="less" scoped>
  .step1 {
    text-align: center;

    &-form {
      display: inline-grid;
    }
  }
</style>
