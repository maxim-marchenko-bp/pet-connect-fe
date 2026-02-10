'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { User } from "@/domain/user/user.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import InputPassword from "@/components/ui/input-password";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { clientFetch } from "@/lib/api/client-fetch";
import { useMutation } from "@tanstack/react-query";

type RegistrationForm = Pick<User, 'name' | 'lastname' | 'email' | 'password' | 'dateOfBirth'>;

export default function Register() {
  const router = useRouter();
  const form = useForm<RegistrationForm>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      dateOfBirth: null,
    }
  });
  const { handleSubmit, formState: { isDirty } } = form;
  const registerUser = async (registrationForm: RegistrationForm) => {
    const body = JSON.stringify(registrationForm);
    return await clientFetch<User>('/auth/register', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } }, false)
  };
  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('User registered successfully!');
      router.push('/login');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  const onFormSubmit = async (registrationForm: RegistrationForm) => {
    return toast.promise(
      mutateAsync(registrationForm),
      {
        loading: 'Registering user...',
        success: 'User registered successfully!',
        error: (err) => err.message,
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image src="/images/logo-text.png" alt="Logo" width={300} height={50} />
          <CardTitle><span className="flex justify-center">Sign Up</span></CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form id="registrationForm" onSubmit={handleSubmit(onFormSubmit)}>
              <FieldGroup>
                <FieldGroup className="flex-row">
                  <FormField
                    name="name"
                    rules={{required: 'Name is required'}}
                    render={({field, fieldState}) => (
                      <FormItem>
                        <Input placeholder="Name" aria-invalid={fieldState.invalid} {...field}></Input>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="lastname"
                    rules={{required: 'Last Name is required'}}
                    render={({field, fieldState}) => (
                      <FormItem>
                        <Input placeholder="Last Name" aria-invalid={fieldState.invalid} {...field}></Input>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </FieldGroup>

                <FormField
                  name="email"
                  rules={{required: 'Email is required'}}
                  render={({field, fieldState}) => (
                    <FormItem>
                      <Input placeholder="Email" aria-invalid={fieldState.invalid} {...field} />
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                <InputPassword name="password" displayPrependIcon={false} />

                <DatePicker name="dateOfBirth" />
              </FieldGroup>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button form="registrationForm" type="submit" className="w-full cursor-pointer" disabled={!isDirty || isPending}>Sign Up</Button>
          <div>
            <span className="text-sm">Already have an account?</span>
            <Button variant="link" className="cursor-pointer" onClick={() => router.push('/login')}>Login</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
