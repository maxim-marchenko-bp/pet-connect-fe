'use client';

import { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectOption } from "@/domain/form/select-option";
import { Spinner } from "@/components/ui/spinner";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export interface InputSelectProps<T extends FieldValues>{
  name: FieldPath<T>;
  selectOptions?: SelectOption[];
  rules?: RegisterOptions;
  placeholder?: string;
  isLoading?: boolean;
  allowClear?: boolean;
}

export function InputSelect<T extends FieldValues>({ name, selectOptions, rules, placeholder, isLoading, allowClear }: InputSelectProps<T>) {
  return (
    <FormField
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <FormItem className="relative w-full max-w-xs">
            <Select
              {...field}
              onValueChange={(value) => {
                // Only call onChange if value is not empty/undefined
                if (value) {
                  field.onChange(value);
                }
              }}
              value={field.value || ''}
            >
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
            {
              field.value && allowClear &&
              <Button
                type="button"
                variant="ghost"
                onClick={() => {field.onChange(null)}}
                className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <XMarkIcon />
              </Button>
            }
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
