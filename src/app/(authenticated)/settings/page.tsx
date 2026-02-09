'use client';

import { useContext } from "react";
import { UserContext } from "@/providers/user-provider/user-context";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/domain/user/user.type";
import { FieldGroup } from "@/components/ui/field";
import { formConfig } from "@/app/(authenticated)/settings/settings-form";
import { FormFieldRenderer } from "@/lib/form/form-field-renderer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api/client-fetch";
import { toast } from "sonner";

export default function Settings() {
  const user = useContext(UserContext);
  const router = useRouter();
  const userProfileForm = useForm<User>({
    defaultValues: {
      name: user?.name || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : null,
    },
  });
  const { handleSubmit } = userProfileForm;
  const onFormSubmit = async (userData: User) => {
    if (user) {
      try {
        await clientFetch(`/users/${user.id}`, { body: JSON.stringify(userData), method: 'PUT', headers: { 'Content-Type': 'application/json' } })
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your profile settings below</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...userProfileForm}>
          <form id="userProfileForm" onSubmit={handleSubmit(onFormSubmit)}>
            <FieldGroup>
              <FormFieldRenderer formConfig={formConfig} />
            </FieldGroup>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => router.back()}>Cancel</Button>
          <Button form="userProfileForm" type="submit">Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
