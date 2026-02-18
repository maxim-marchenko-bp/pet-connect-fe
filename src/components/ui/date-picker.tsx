'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PropsWithChildren, useState } from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/class-name/class-name";

export interface DatePickerProps extends PropsWithChildren {
  name: string;
}

export function DatePicker({ name }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [userLocale] = useState(() => Intl.DateTimeFormat().resolvedOptions().locale ?? 'en-GB');

  return (
    <FormField
      name={name}
      rules={{required: 'Date of birth is required'}}
      render={({field, fieldState}) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                aria-invalid={fieldState.invalid}
                className={`
                  ${cn(
                  "justify-start font-normal cursor-pointer py-1 px-3",
                  "aria-invalid:border-destructive aria-invalid:border aria-invalid:focus:ring-3"
                  )}
                `}
              >
                {
                  field.value
                    ? field.value.toLocaleDateString(userLocale)
                    : <span className="text-gray-500">Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                defaultMonth={field.value}
                captionLayout="dropdown"
                {...field}
                onSelect={(date) => {
                  field.onChange(date)
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}
