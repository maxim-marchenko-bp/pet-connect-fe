'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { User } from "@/domain/user/user.type";
import Image from "next/image";

export default function Register() {
  const { formState: { errors }, register, handleSubmit } = useForm<User>();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image src="/images/logo-text.png" alt="Logo" width={300} height={50} />
          <CardTitle><span className="flex justify-center">Sign Up</span></CardTitle>
        </CardHeader>

        <CardContent>
          <form id="registrationForm" onSubmit={handleSubmit((data) => console.log(data))}>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
