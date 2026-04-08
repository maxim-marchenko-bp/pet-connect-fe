'use client';

import { useForm } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { clientFetch } from "@/lib/api/client-fetch";
import { InputText } from "@/components/ui/input-text";
import { Button } from "@/components/ui/button";
import { PetInvite } from "@/domain/pet-invite/pet-invite.model";
import { Separator } from "@/components/ui/separator";
import { PetInvitationDetails } from "@/app/(authenticated)/pets/components/pet-invitation-details";

export function PetInvitation() {
  const form = useForm({
    defaultValues: {
      url: '',
    },
  });

  const { handleSubmit } = form;
  const checkInvitation = async ({ url }: { url: string }) => {
    return await clientFetch<PetInvite>(url, undefined, true, true);
  }
  const { handleSubmit: handleInvitationCheck, data } = useFormMutation({
    mutationFn: checkInvitation,
    messages: {
      loading: 'Checking invitation...',
      success: 'Invitation successfully checked.',
      error: (error) => error.message,
    },
  });

  return (
    <Card className="p-6">
      <CardTitle>Invitation link</CardTitle>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleInvitationCheck)}>
          <InputText name={'url'} placeholder="Paste invitation link" rules={{required: 'Invitation link is required'}} />
          <div className="mt-4 flex justify-end">
            <Button type="submit">Check invitation</Button>
          </div>
        </form>
      </Form>
      {
        data && data.pet &&
          <div>
            <Separator className="mb-6"/>
            <PetInvitationDetails pet={data.pet} url={form.getValues().url} />
          </div>
      }
    </Card>
  )
}
