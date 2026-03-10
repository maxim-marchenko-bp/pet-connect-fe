import { FormFieldConfig } from "@/domain/form/form.type";

export const changePasswordFormConfig: FormFieldConfig[] = [
  {
    name: 'currentPassword',
    placeholder: 'Current password',
    type: 'password',
    hideComponentMessage: true,
    rules: { required: 'Current password is required' },
  },
  {
    name: 'newPassword',
    placeholder: 'New password',
    type: 'password',
    hideComponentMessage: true,
    rules: { required: 'New password is required' },
  },
  {
    name: 'confirmedNewPassword',
    placeholder: 'Confirm new password',
    type: 'password',
    hideComponentMessage: true,
    rules: {
      required: 'Please confirm your new password',
      validate: (value, formValues) => value === formValues.newPassword || 'Passwords do not match',
    },
  },
];
