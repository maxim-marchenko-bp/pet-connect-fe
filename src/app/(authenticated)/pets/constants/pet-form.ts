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
    rules: { required: 'Date of birth is required' },
  },
  {
    name: 'type',
    placeholder: 'Select a type',
    type: 'select',
    rules: { required: 'Type is required' },
  },
];
