<template>
  <div class="w-150 m-auto">
    <Result status="success" class="pb-0px" :sub-title="{ getSubTitle }">
      <template #extra>
        <a-button type="primary" @click="emit('prev')"> 继续导入 </a-button>
      </template>
    </Result>
  </div>
</template>
<script lang="ts" setup>
  import { Result } from 'ant-design-vue';
  import { computed } from 'vue';

  const emit = defineEmits(['prev']);
  const { resultData } = defineProps(['resultData']);

  const getSubTitle = computed(() => {
    const { link } = resultData;
    return link;
  });
</script>
