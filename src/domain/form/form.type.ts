import { ControllerProps } from "react-hook-form";
import { SelectOption } from "@/domain/form/select-option";

export type FormFieldType = 'text' | 'date' | 'dateRange' | 'password' | 'select';

export interface FormFieldConfig extends Pick<ControllerProps, 'name' | 'rules'> {
  type: FormFieldType;
  placeholder?: string;
  selectOptions?: SelectOption[];
  isLoading?: boolean;
  allowClear?: boolean;
}
