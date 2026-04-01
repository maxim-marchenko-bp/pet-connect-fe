import { FormFieldConfig } from "@/domain/form/form.type";

export const userFilterFormConfig: FormFieldConfig[] = [
  {
    name: 'gender',
    type: 'select',
    placeholder: 'Select gender',
    allowClear: true,
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    placeholder: 'Select date',
    allowClear: true,
  },
];
