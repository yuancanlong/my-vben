<template>
  <div>
    <UploadDragger
      v-bind="$attrs"
      v-model:fileList="fileList"
      :list-type="listType"
      :multiple="multiple"
      :maxCount="maxNumber"
      :custom-request="customRequest"
      :accept="getStringAccept"
      @remove="handleRemove"
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
  import { omit, get, isObject, isString, isArray } from 'lodash-es';
  import { UploadDragger, UploadFile, UploadProps } from 'ant-design-vue';
  import { ref, toRefs, watch } from 'vue';
  import { useUploadType } from '@/components/Upload/src/hooks/useUpload';
  import { InboxOutlined } from '@ant-design/icons-vue';
  import { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface';
  import { isFunction } from '@/utils/is';
  import { warn } from '@/utils/log';
  import { UploadResultStatus } from '@/components/Upload/src/types/typing';

  defineOptions({ name: 'UploadDragger' });
  const emit = defineEmits(['change', 'update:value', 'delete']);
  const props = defineProps({
    ...omit(uploadContainerProps, ['previewColumns', 'beforePreviewData']),
    listType: {
      default: 'text',
    },
  });
  const { accept, helpText, maxNumber, maxSize } = toRefs(props);
  const { getStringAccept } = useUploadType({
    acceptRef: accept,
    helpTextRef: helpText,
    maxNumberRef: maxNumber,
    maxSizeRef: maxSize,
  });
  const isInnerOperate = ref<boolean>(false);
  const fileList = ref<UploadProps['fileList']>([]);

  watch(
    () => props.value,
    (v) => {
      if (isInnerOperate.value) {
        isInnerOperate.value = false;
        return;
      }
      if (v) {
        let value: string[] = [];
        if (isArray(v)) {
          value = v;
        } else {
          value.push(v);
        }
        fileList.value = value.map((item, i) => {
          if (item && isString(item)) {
            return {
              uid: -i + '',
              name: item.substring(item.lastIndexOf('/') + 1),
              status: 'done',
              url: item,
            };
          } else if (item && isObject(item)) {
            return item;
          } else {
            return;
          }
        }) as UploadProps['fileList'];
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  function getValue() {
    const list = (fileList.value || [])
      .filter((item) => item?.status === UploadResultStatus.DONE)
      .map((item: any) => {
        if (props.resultField) {
          return get(item?.response, props.resultField);
        }
        return item?.url || item?.response?.url;
      });
    return props.multiple ? list : list.length > 0 ? list[0] : '';
  }

  async function customRequest(info: UploadRequestOption<any>) {
    const { api } = props;
    if (!api || !isFunction(api)) {
      return warn('upload api must exist and be a function');
    }
    try {
      const res = await props.api?.({
        data: {
          ...(props.uploadParams || {}),
        },
        file: info.file,
        name: props.name,
        filename: props.filename,
      });
      if (props.resultField) {
        info.onSuccess!(res);
      } else {
        // 不传入 resultField 的情况
        info.onSuccess!(res.data);
      }
      const value = getValue();
      isInnerOperate.value = true;
      emit('update:value', value);
      emit('change', value);
    } catch (e: any) {
      console.log(e);
      info.onError!(e);
    }
  }
  const handleRemove = async (file: UploadFile) => {
    if (fileList.value) {
      const index = fileList.value.findIndex((item) => item.uid === file.uid);
      index !== -1 && fileList.value.splice(index, 1);
      const value = getValue();
      isInnerOperate.value = true;
      emit('update:value', value);
      emit('change', value);
      emit('delete', file);
    }
  };
</script>
