<template>
  <div>
    <UploadDragger
      v-bind="$attrs"
      v-model:fileList="fileList"
      :list-type="listType"
      :accept="getStringAccept"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </UploadDragger>
  </div>
</template>
<script lang="ts" setup>
  import { uploadContainerProps } from '@/components/Upload/src/props';
  import { omit } from 'lodash-es';
  import { Modal, UploadDragger, UploadProps } from 'ant-design-vue';
  import { ref, toRefs } from 'vue';
  import { useUploadType } from '@/components/Upload/src/hooks/useUpload';
  import { InboxOutlined } from '@ant-design/icons-vue';

  defineOptions({ name: 'UploadDragger' });
  const emit = defineEmits(['change', 'update:value', 'delete']);
  const props = defineProps({
    ...omit(uploadContainerProps, ['previewColumns', 'beforePreviewData']),
  });
  const { accept, helpText, maxNumber, maxSize } = toRefs(props);
  const { getStringAccept } = useUploadType({
    acceptRef: accept,
    helpTextRef: helpText,
    maxNumberRef: maxNumber,
    maxSizeRef: maxSize,
  });

  const fileList = ref<UploadProps['fileList']>([]);
</script>
