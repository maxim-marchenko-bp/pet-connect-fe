'use client';

import { useForm } from "react-hook-form";
import { clientFetch } from "@/lib/api/client-fetch";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import { FormFieldRenderer } from "@/lib/form/form-field-renderer";
import {
  changePasswordFormConfig
} from "@/app/(authenticated)/settings/components/change-password/change-password-form";
import { Button } from "@/components/ui/button";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmedNewPassword: string;
}

export function ChangePassword() {
  const passwordForm = useForm<ChangePasswordForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmedNewPassword: '',
    },
  });
  const { handleSubmit, formState: { isDirty } } = passwordForm;

  const changePassword = (data: ChangePasswordForm) => {
    const body = JSON.stringify(data);
    return clientFetch<{ message: string }>('/users/me/change-password', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } });
  };

  const { handleSubmit: handleFormSubmit, isPending } = useFormMutation({
    mutationFn: changePassword,
    messages: {
      loading: 'Changing password...',
      success: (res) => res.message,
      error: (err) => err.message,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...passwordForm} >
          <form id="change-password-form" onSubmit={handleSubmit(handleFormSubmit)}>
            <FieldGroup>
              <FormFieldRenderer formConfig={changePasswordFormConfig} />
            </FieldGroup>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <div className="flex gap-4">
          <Button disabled={!isDirty || isPending} form="change-password-form" type="submit">Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  )

}
