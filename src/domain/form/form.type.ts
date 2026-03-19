import { ControllerProps } from "react-hook-form";
import { SelectOption } from "@/domain/form/select-option";

export interface FormFieldConfig extends Pick<ControllerProps, 'name' | 'rules'> {
  type: 'text' | 'date' | 'password' | 'select';
  placeholder?: string;
  selectOptions?: SelectOption[]
}
