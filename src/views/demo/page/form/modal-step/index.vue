<template>
  <div>
    <a-button type="primary" class="my-4" @click="openModal2"> 打开弹窗 </a-button>
    <Modal2 @register="register2" />
  </div>
</template>
<script lang="ts" setup>
  import { useModal } from '@/components/Modal';
  import Modal2 from './Modal2.vue';
  defineOptions({ name: 'FormStepModalPage' });
  const [register2, { openModal: openModal2 }] = useModal();
</script>
<style lang="less" scoped></style>
