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
import { useUser } from "@/hooks/use-user";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useQuery } from "@tanstack/react-query";
import { Gender } from "@/domain/gender/gender.enum";
import { FormFieldConfig } from "@/domain/form/form.type";
import { titleCase } from "@/lib/text-transform/titlecase";

export function ProfileInfo() {
  const { user, setUser } = useUser();
  const profileInfoForm = useForm<User>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      dateOfBirth: null,
      gender: undefined,
    },
  });
  const { handleSubmit, formState: { isDirty }, reset } = profileInfoForm;

  const updateUserInfo = async (userData: User) => {
    if (user) {
      return await clientFetch<User>(`/users/${user.id}`, { body: JSON.stringify(userData), method: 'PUT', headers: { 'Content-Type': 'application/json' } });
    }
  };
  const { data: genders, isLoading } = useQuery({
    queryKey: ['genders'],
    queryFn: () => clientFetch<Gender[]>('/genders'),
  });
  const profileInfoFormConfigPopulated = profileInfoFormConfig.map(field => {
    if (field.name === 'gender') {
      return {
        ...field,
        selectOptions: genders?.map(gender => ({ value: gender, label: titleCase(gender) })),
        isLoading,
      } as FormFieldConfig
    } else {
      return field;
    }
  });

  const { handleSubmit: onFormSubmit, isPending } = useFormMutation({
    mutationFn: updateUserInfo,
    onSuccess: (updatedUser) => {
      if (updatedUser) {
        setUser(updatedUser);
      }
    },
    onError: (error, userData) => {
      reset(
        {
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
          gender: userData.gender,
        },
        {
          keepDirty: true,
        }
      );
    },
    messages: {
      loading: 'Updating profile...',
      success: 'Profile updated successfully!',
      error: (err) => err.message,
    },
  });

  useEffect(() => {
    if (user) {
      // TODO revisit this to refactor
      setTimeout(() => {
        reset({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
            gender: user.gender,
          },
          {
            keepDirty: false
          });
      })
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
              <FormFieldRenderer formConfig={profileInfoFormConfigPopulated} />
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
