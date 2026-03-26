'use client';

import { RegisterOptions } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface InputTextProps {
  name: string;
  rules?: RegisterOptions;
  placeholder?: string;
}

export function InputText({ name, rules, placeholder }: InputTextProps) {
  return (
    <FormField
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <Input {...field} aria-invalid={fieldState.invalid} placeholder={placeholder} />
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}
