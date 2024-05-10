<template>
  <div class="m-auto text-align">
    <BasicForm @register="register"> </BasicForm>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { step3Schemas } from './data';
  import { uploadApi } from '@/api/sys/upload';

  const emit = defineEmits(['next', 'prev']);

  const [register, { getFieldsValue: getFieldsValueCustom, setProps, submit }] = useForm({
    labelWidth: 80,
    schemas: [
      {
        field: 'pwd',
        component: 'UploadDragger',
        colProps: {
          span: 24,
        },
        componentProps: {
          maxNumber: 1,
          resultField: 'pwd',
          api: (file, progress) => {
            return new Promise((resolve) => {
              // todo
              submit();
              // uploadApi(file, progress).then((uploadApiResponse) => {
              //   resolve({
              //     code: 200,
              //     pwd: uploadApiResponse.data.url,
              //   });
              //   // submit();
              // });
            });
          },
        },
      },
    ],
    actionColOptions: {
      span: 24,
      style: 'text-align:center',
    },
    resetButtonOptions: {
      text: '上一步',
    },
    showSubmitButton: false,
    // submitButtonOptions: {
    //   text: '提交',
    // },
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
        // emit('next', getFieldsValueCustom());
        emit('next', { asd: 1 });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }
</script>
