'use client';

import { useForm } from "react-hook-form";
import { Pet } from "@/domain/pet/pet.model";
import { clientFetch } from "@/lib/api/client-fetch";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useRouter } from "next/navigation";
import { Page, PageContent, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormFieldRenderer } from "@/lib/form/form-field-renderer";
import { petFormConfig } from "@/app/(authenticated)/pets/constants/pet-form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormFieldConfig } from "@/domain/form/form.type";
import { useUser } from "@/hooks/use-user";
import { usePetTypes } from "@/hooks/use-pet-types";

export default function NewPetPage() {
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<Pet>({
    defaultValues: {
      name: '',
      dateOfBirth: null,
      type: undefined,
      users: [user],
    },
  });
  const { handleSubmit } = form;
  const { data: petTypes, isLoading } = usePetTypes();

  const petFormFields = petFormConfig.map(field => {
    if (field.name === 'type') {
      return {
        ...field,
        selectOptions: petTypes?.map(type => ({ value: type.code, label: type.label })),
        isLoading,
      } as FormFieldConfig
    } else {
      return field;
    }
  });

  const createPet = async (formValue: Pet) => {
    const body = JSON.stringify(formValue);
    return await clientFetch('/pets', { body, method: 'POST', headers: { 'Content-Type': 'application/json' } });
  };

  const { handleSubmit: handleFormSubmit } = useFormMutation({
    mutationFn: createPet,
    onSuccess: () => router.push('/home/pets'),
    messages: {
      loading: 'Creating pet...',
      success: 'Pet created successfully!',
      error: (err) => err.message,
    }
  });

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Create new pet</PageHeaderTitle>
        <PageHeaderSubtitle>Fill information about your pet</PageHeaderSubtitle>
      </PageHeader>

      <PageContent>
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FieldGroup>
                <FormFieldRenderer formConfig={petFormFields} />
              </FieldGroup>
              <div className="mt-4 flex justify-end">
                <Button type="submit">Create pet</Button>
              </div>
            </form>
          </Form>
        </Card>
      </PageContent>
    </Page>
  )
}
