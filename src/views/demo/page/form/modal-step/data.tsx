import { uploadApi } from '@/api/sys/upload';
import { FormSchema } from '@/components/Form';

export const step3Schemas: FormSchema[] = [
  {
    field: 'pwd',
    component: 'UploadDragger',
    // label: 'wode',
    colProps: {
      span: 24,
    },
    componentProps: {
      api: uploadApi,
    },
  },
];
