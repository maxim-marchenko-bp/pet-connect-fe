'use client';

import { FormProvider, useForm } from "react-hook-form"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { User } from "@/domain/user/user.type";
import InputPassword from "@/components/ui/input-password";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<User>();
  const { register, handleSubmit, formState: { errors } } = form;
  const onFormSubmit = (data: User) => console.log(data);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image src="/images/logo-text.png" alt="Logo" width={300} height={50} />
          <CardTitle><span className="flex justify-center">Login to your account</span></CardTitle>
        </CardHeader>

        <CardContent>
          <form id="loginForm" onSubmit={handleSubmit(onFormSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <InputGroup>
                  <InputGroupAddon align="inline-start"><EnvelopeIcon/></InputGroupAddon>
                  <InputGroupInput aria-invalid={!!errors.email} { ...register('email',  { required: 'This field is required' }) } placeholder="Email"/>
                </InputGroup>
                <FieldError errors={[errors.email]} />
              </Field>

              <FormProvider {...form}>
                <InputPassword name="password"></InputPassword>
              </FormProvider>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button form="loginForm" type="submit" className="w-full cursor-pointer">Login</Button>
          <div>
            <span className="text-sm">Don&#39;t have an account?</span>
            <Button className="cursor-pointer" variant="link" onClick={() => router.push('/register')}>Sign up</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
