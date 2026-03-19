'use client';

import { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectOption } from "@/domain/form/select-option";

export interface InputSelectProps<T extends FieldValues>{
  name: FieldPath<T>;
  selectOptions?: SelectOption[];
  rules?: RegisterOptions;
  placeholder?: string;
}

export function InputSelect<T extends FieldValues>({ name, selectOptions, rules, placeholder }: InputSelectProps<T>) {
  console.log(selectOptions)
  return (
    <FormField
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <Select {...field}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {selectOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
