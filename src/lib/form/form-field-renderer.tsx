import { PropsWithChildren, ReactElement } from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker, DatePickerProps } from "@/components/ui/date-picker";
import { FormFieldConfig } from "@/domain/form/form.type";

export function FormFieldRenderer({ formConfig }: PropsWithChildren<{ formConfig: FormFieldConfig[] }>) {
  const inputByType: Record<string, (props: any) => ReactElement> = {
    text: (props: PropsWithChildren) => <Input {...props} />,
    date: (props: DatePickerProps) => <DatePicker {...props} />
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
              <InputComponent placeholder={item.placeholder} {...field} aria-invalid={fieldState.invalid}/>
              <FormMessage/>
            </FormItem>
          )}
        />
      )
    })
  )
}
