import { FormFieldConfig } from "@/domain/form/form.type";

export const profileInfoFormConfig: FormFieldConfig[] = [
  {
    name: 'name',
    placeholder: 'Name',
    rules: { required: 'Name is required' },
    type: 'text',
  },
  {
    name: 'lastname',
    placeholder: 'Last Name',
    rules: { required: 'Last name is required' },
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'Email',
    rules: { required: 'Email is required' },
    type: 'text',
  },
  {
    name: 'dateOfBirth',
    placeholder: 'Date of Birth',
    type: 'date',
    rules: { required: 'Date of birth is required' },
  },
];
