import { FormFieldConfig } from "@/domain/form/form.type";

export const changePasswordFormConfig: FormFieldConfig[] = [
  {
    name: 'currentPassword',
    placeholder: 'Current password',
    type: 'password',
    rules: { required: 'Current password is required' },
  },
  {
    name: 'newPassword',
    placeholder: 'New password',
    type: 'password',
    rules: { required: 'New password is required' },
  },
  {
    name: 'confirmedNewPassword',
    placeholder: 'Confirm new password',
    type: 'password',
    rules: {
      required: 'Please confirm your new password',
      validate: (value, formValues) => value === formValues.newPassword || 'Passwords do not match',
    },
  },
];
