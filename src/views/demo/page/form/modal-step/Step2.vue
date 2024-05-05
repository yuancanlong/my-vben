<template>
  <div class="m-auto">
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { step3Schemas } from './data';

  const emit = defineEmits(['next', 'prev']);

  const [register, { getFieldsValue: getFieldsValueCustom, setProps }] = useForm({
    labelWidth: 80,
    schemas: step3Schemas,
    actionColOptions: {
      span: 14,
    },
    resetButtonOptions: {
      text: '上一步',
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetFunc: customResetFunc,
    submitFunc: customSubmitFunc,
  });

  async function customResetFunc() {
    emit('prev');
  }

  async function customSubmitFunc() {
    try {
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      setTimeout(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
        emit('next', getFieldsValueCustom());
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }
</script>
