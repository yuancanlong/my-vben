<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="Modal Title"
    :helpMessage="['提示1', '提示2']"
    width="960px"
    :destroyOnClose="true"
    @cancel="handleRedo"
  >
    <div class="pl4 pr4">
      <div class="step-form-form">
        <Steps :current="current">
          <Steps.Step title="下载文件" />
          <Steps.Step title="导入文件" />
          <Steps.Step title="导入完成" />
        </Steps>
      </div>
      <div class="mt-5">
        <Step1 @next="handleStep1Next" v-show="current === 0" />
        <Step2
          @prev="handleStepPrev"
          @next="handleStep2Next"
          v-show="current === 1"
          v-if="state.initStep2"
        />
        <Step3
          v-show="current === 2"
          :subTitle="subTitle"
          :resultData="resultData"
          @prev="handleStepPrev"
        />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref, reactive } from 'vue';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  import { Steps } from 'ant-design-vue';

  const [register] = useModalInner();

  const current = ref(0);
  const subTitle = ref('asd');

  let resultData = reactive({
    status: 'success',
    subTitle: '222',
    link: 'asd',
  });

  const state = reactive({
    initStep2: false,
    initStep3: false,
  });
  function handleStep1Next(step1Values: any) {
    current.value++;
    state.initStep2 = true;
  }

  function handleStepPrev() {
    current.value--;
  }

  function handleStep2Next(step2Values: any) {
    current.value++;
    state.initStep3 = true;
    resultData.link = step2Values.asd;
  }

  function handleRedo() {
    current.value = 0;
    state.initStep2 = false;
    state.initStep3 = false;
  }
</script>
<style lang="less" scoped>
  .step-form-content {
    padding: 24px;
    background-color: @component-background;
  }

  .step-form-form {
    // width: 750px;
    margin: 0 auto;
  }
</style>
