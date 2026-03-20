'use client';

import { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectOption } from "@/domain/form/select-option";
import { Spinner } from "@/components/ui/spinner";

export interface InputSelectProps<T extends FieldValues>{
  name: FieldPath<T>;
  selectOptions?: SelectOption[];
  rules?: RegisterOptions;
  placeholder?: string;
  isLoading?: boolean;
}

export function InputSelect<T extends FieldValues>({ name, selectOptions, rules, placeholder, isLoading }: InputSelectProps<T>) {
  return (
    <FormField
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <Select {...field} onValueChange={(v) => field.onChange(v)}>
            <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent position="popper">
              <SelectGroup>
                {
                  isLoading
                  ? <SelectItem value={'option1'} className="pointer-events-none flex justify-center">
                      <Spinner />
                    </SelectItem>
                  : selectOptions?.map((option) =>
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    )
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
