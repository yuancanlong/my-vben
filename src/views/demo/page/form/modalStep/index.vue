<template>
  <a-button type="primary" class="my-4" @click="openModal2"> 打开弹窗 </a-button>
  <Modal2 @register="register2" />
</template>
<script lang="ts" setup>
  import { useModal } from '@/components/Modal';
  import Modal2 from './Modal2.vue';
  const [register2, { openModal: openModal2 }] = useModal();
</script>
