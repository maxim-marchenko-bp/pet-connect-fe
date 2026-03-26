import { PropsWithChildren, ReactElement } from "react";
import { DatePicker, DatePickerProps } from "@/components/ui/date-picker";
import { FormFieldConfig } from "@/domain/form/form.type";
import { InputPassword, PasswordProps } from "@/components/ui/input-password";
import { FieldValues } from "react-hook-form";
import { InputSelect, InputSelectProps } from "@/components/ui/input-select";
import { InputText, InputTextProps } from "@/components/ui/input-text";

export function FormFieldRenderer({ formConfig }: PropsWithChildren<{ formConfig: FormFieldConfig[] }>) {
  const inputByType: Record<string, (props: any) => ReactElement> = {
    text: (props: InputTextProps) => <InputText {...props} />,
    date: (props: DatePickerProps) => <DatePicker {...props} />,
    password: (props: PasswordProps<FieldValues>) => <InputPassword {...props} />,
    select: (props: InputSelectProps<FieldValues>) => <InputSelect {...props} />
  };

  return (
    formConfig.map(item => {
      const InputComponent = inputByType[item.type];
      return <InputComponent key={item.name} {...item}/>
    })
  )
}
