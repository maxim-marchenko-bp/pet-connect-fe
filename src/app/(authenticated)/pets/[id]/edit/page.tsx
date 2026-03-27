'use client';

import { Page, PageContent, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { useForm } from "react-hook-form";
import { CreatePetDto, Pet } from "@/domain/pet/pet.model";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { petFormConfig } from "@/app/(authenticated)/pets/constants/pet-form";
import { FormFieldConfig } from "@/domain/form/form.type";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import { FormFieldRenderer } from "@/lib/form/form-field-renderer";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePetTypes } from "@/hooks/use-pet-types";

export default function EditPetPage() {
  const { id: petId } = useParams();
  const router = useRouter();
  const { data: pet } = useQuery({
    queryKey: ['pet'],
    queryFn: () => clientFetch<Pet>(`/pets/${petId}`),
  });
  const form = useForm<CreatePetDto>({
    defaultValues: {
      name: '',
      dateOfBirth: null,
      type: null,
    },
  });
  const { handleSubmit, reset, formState: { isDirty } } = form;
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

  const updatePet = async (formValue: CreatePetDto) => {
    const body = JSON.stringify(formValue);
    return await clientFetch(`/pets/${petId}`, { body, method: 'PUT', headers: { 'Content-Type': 'application/json' } });
  };

  const { handleSubmit: handleFormSubmit, isPending } = useFormMutation({
    mutationFn: updatePet,
    messages: {
      loading: 'Updating pet...',
      success: () => {
        router.push(`/pets/${petId}`);
        return 'Pet updated successfully!';
      },
      error: (err) => err.message,
    }
  });

  useEffect(() => {
    if (pet) {
      setTimeout(() => {
        reset(
          {
            name: pet.name,
            dateOfBirth: pet.dateOfBirth ? new Date(pet.dateOfBirth) : null,
            type: pet.type.code,
          },
          {
            keepDirty: false
          },
        );
      })
    }
  }, [pet, reset]);

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Edit pet</PageHeaderTitle>
        <PageHeaderSubtitle>Edit information about your pet</PageHeaderSubtitle>
      </PageHeader>

      <PageContent>
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FieldGroup>
                <FormFieldRenderer formConfig={petFormFields} />
              </FieldGroup>
              <div className="mt-4 flex justify-end gap-4">
                <Button variant="secondary" type="button" onClick={() => router.push(`/pets/${petId}`)} disabled={isPending}>Cancel</Button>
                <Button disabled={!isDirty || isPending} type="submit">Update pet</Button>
              </div>
            </form>
          </Form>
        </Card>
      </PageContent>
    </Page>
  )
}
