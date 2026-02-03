'use client';

import { useForm } from "react-hook-form"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { User } from "@/domain/user/user.type";
import InputPassword from "@/components/ui/input-password";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit} = form;
  const onFormSubmit = (data: User) => console.log(data);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image src="/images/logo-text.png" alt="Logo" width={300} height={50} />
          <CardTitle><span className="flex justify-center">Login to your account</span></CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form id="loginForm" onSubmit={handleSubmit(onFormSubmit)}>
              <FieldGroup>
                <FormField
                  name="email"
                  rules={{required: 'Email is required'}}
                  render={({field, fieldState}) => (
                    <FormItem>
                      <InputGroup>
                        <InputGroupAddon align="inline-start"><EnvelopeIcon/></InputGroupAddon>
                        <InputGroupInput aria-invalid={fieldState.invalid} placeholder="Email" {...field} />
                      </InputGroup>
                      <FormMessage/>
                    </FormItem>
                  )} />

                <InputPassword name="password"></InputPassword>
              </FieldGroup>
            </form>
          </Form>
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
