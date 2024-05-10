<template>
  <div class="w-150 m-auto">
    <Result status="success" class="pb-0px" :subTitle="getSubTitle">
      <!-- :sub-title="{ getSubTitle }" -->
      <template #extra>
        <a-button type="primary" @click="emit('prev')"> 继续导入 </a-button>
      </template>
    </Result>
  </div>
</template>
<script lang="ts" setup>
  import { Result } from 'ant-design-vue';
  import { computed, toRefs, unref } from 'vue';

  const emit = defineEmits(['prev']);
  const { subTitle, resultData } = defineProps({
    subTitle: {
      type: String,
      default: '',
    },
    resultData: {
      type: Object,
      default: {
        status: 'success',
        subTitle: '111',
        link: 'asd',
      },
    },
  });

  const getSubTitle = computed(() => {
    return resultData.subTitle;
  });
</script>
