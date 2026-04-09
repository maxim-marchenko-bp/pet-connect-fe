import { FormFieldConfig } from "@/domain/form/form.type";

export const petListFilterForm: FormFieldConfig[] = [
  {
    name: 'type',
    type: 'select',
    allowClear: true,
    placeholder: 'Select type',
  },
  {
    name: 'dateOfBirth',
    type: 'dateRange',
    placeholder: 'Select date',
    allowClear: true,
  },
];
