'use client';

import { RegisterOptions } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface InputTextProps {
  name: string;
  rules?: RegisterOptions;
}

export function InputText({ name, rules }: InputTextProps) {
  return (
    <FormField
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <Input {...field} aria-invalid={fieldState.invalid} />
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}
