<template>
  <div>
    <Typography.Text :content="String(props.percent)"></Typography.Text>
  </div>
</template>
<script lang="ts" setup>
  import { Modal, Form, FormItem, Button, Typography } from 'ant-design-vue';
  import { nextTick, ref, watch } from 'vue';

  const props = defineProps({
    percent: {
      type: Number,
      default: '',
    },
    form: {
      type: Function,
      default: () => {},
    },
    getDataSource: {
      type: Function,
      default: () => {},
    },
  });

  const open = ref(false);
  const hanle = () => {
    open.value = true;
  };
</script>
