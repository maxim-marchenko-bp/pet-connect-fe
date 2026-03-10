'use client';

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/domain/user/user.model";
import { FieldGroup } from "@/components/ui/field";
import { profileInfoFormConfig } from "@/app/(authenticated)/settings/components/profile-info/profile-info-form";
import { FormFieldRenderer } from "@/lib/form/form-field-renderer";
import { Button } from "@/components/ui/button";
import { clientFetch } from "@/lib/api/client-fetch";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";

export function ProfileInfo() {
  const { user, setUser } = useUser();
  const profileInfoForm = useForm<User>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      dateOfBirth: null,
    },
  });
  const { handleSubmit, formState: { isDirty }, reset } = profileInfoForm;
  const updateUserInfo = async (userData: User) => {
    if (user) {
      return await clientFetch<User>(`/users/${user.id}`, { body: JSON.stringify(userData), method: 'PUT', headers: { 'Content-Type': 'application/json' } });
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (user: User | undefined) => {
      if (user) {
        setUser(user);
        toast.success('Profile updated successfully');
      }
    },
    onError: (error, user) => {
      toast.error(error.message);
      reset(
        {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
        },
        {
          keepDirty: true,
        }
      )
    },
  });

  const onFormSubmit = (userData: User) => {
    return toast.promise(
      mutateAsync(userData),
      {
        loading: 'Updating profile...',
        success: 'Profile updated successfully!',
        error: (err) => err.message,
      }
    )
  }

  useEffect(() => {
    if (user) {
      reset({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
        },
        {
          keepDirty: false
        });
    }
  }, [user, reset]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information below</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...profileInfoForm}>
          <form id="profileInfoForm" onSubmit={handleSubmit(onFormSubmit)}>
            <FieldGroup>
              <FormFieldRenderer formConfig={profileInfoFormConfig} />
            </FieldGroup>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <div className="flex gap-4">
          <Button disabled={!isDirty || isPending} form="profileInfoForm" type="submit">Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
