import { FormFieldConfig } from "@/domain/form/form.type";

export const petFormConfig: FormFieldConfig[] = [
  {
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    rules: { required: 'Name is required' },
  },
  {
    name: 'dateOfBirth',
    placeholder: 'Date of Birth',
    type: 'date',
  },
  {
    name: 'type',
    placeholder: 'Select a type',
    type: 'select',
    selectOptions: [
      {
        label: 'Cat',
        value: '1',
      },
      {
        label: 'Dog',
        value: '2',
      }
    ]
  },
];
