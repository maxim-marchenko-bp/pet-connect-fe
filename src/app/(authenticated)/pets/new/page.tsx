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

export default function NewPetPage() {
  const router = useRouter();
  const form = useForm<Pet>({
    defaultValues: {
      name: '',
      dateOfBirth: null,
      type: undefined,
      users: [],
    },
  });
  const { handleSubmit } = form;

  const createPet = async (formValue: Pet) => {
    const body = JSON.stringify(formValue);
    return await clientFetch('/pets', { body, method: 'POST', headers: { 'Content-Type': 'application/json' } });
  };

  const { handleSubmit: handleFormSubmit } = useFormMutation({
    mutationFn: createPet,
    onSuccess: () => router.push('/home'),
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
        <Card>
          <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormFieldRenderer formConfig={petFormConfig} />
              <Button type="submit">Create pet</Button>
            </form>
          </Form>
        </Card>
      </PageContent>
    </Page>
  )
}
