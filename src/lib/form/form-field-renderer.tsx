import { PropsWithChildren, ReactElement } from "react";
import { DatePicker, DatePickerProps } from "@/components/ui/date-picker";
import { FormFieldConfig, FormFieldType } from "@/domain/form/form.type";
import { InputPassword, PasswordProps } from "@/components/ui/input-password";
import { FieldValues } from "react-hook-form";
import { InputSelect, InputSelectProps } from "@/components/ui/input-select";
import { InputText, InputTextProps } from "@/components/ui/input-text";
import { DateRangePicker, DateRangePickerProps } from "@/components/ui/date-range-picker";

export function FormFieldRenderer({ formConfig }: PropsWithChildren<{ formConfig: FormFieldConfig[] }>) {
  const inputByType: Record<FormFieldType, (props: any) => ReactElement> = {
    text: (props: InputTextProps) => <InputText {...props} />,
    date: (props: DatePickerProps) => <DatePicker {...props} />,
    dateRange: (props: DateRangePickerProps) => <DateRangePicker {...props} />,
    password: (props: PasswordProps<FieldValues>) => <InputPassword {...props} />,
    select: (props: InputSelectProps<FieldValues>) => <InputSelect {...props} />,
  };

  return (
    formConfig?.map(item => {
      const InputComponent = inputByType[item.type];
      return <InputComponent key={item.name} {...item}/>
    })
  )
}
