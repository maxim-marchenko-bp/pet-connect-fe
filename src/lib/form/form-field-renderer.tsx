import { PropsWithChildren, ReactElement } from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker, DatePickerProps } from "@/components/ui/date-picker";
import { FormFieldConfig } from "@/domain/form/form.type";
import InputPassword, { PasswordProps } from "@/components/ui/input-password";
import { FieldValues } from "react-hook-form";
import { InputSelect, InputSelectProps } from "@/components/ui/input-select";

export function FormFieldRenderer({ formConfig }: PropsWithChildren<{ formConfig: FormFieldConfig[] }>) {
  const inputByType: Record<string, (props: any) => ReactElement> = {
    text: (props: PropsWithChildren) => <FormItem><Input {...props} /><FormMessage /></FormItem>,
    date: (props: DatePickerProps) => <DatePicker {...props} />,
    password: (props: PasswordProps<FieldValues>) => <InputPassword {...props} />,
    select: (props: InputSelectProps<FieldValues>) => <InputSelect {...props} />
  };

  return (
    formConfig.map(item => {
      const InputComponent = inputByType[item.type];

      return (
        <FormField
          key={item.name}
          name={item.name}
          rules={item.rules}
          render={({field, fieldState}) => (
            <FormItem>
              <InputComponent {...item} {...field} aria-invalid={fieldState.invalid}/>
            </FormItem>
          )}
        />
      )
    })
  )
}
