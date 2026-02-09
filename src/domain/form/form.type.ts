import { ControllerProps } from "react-hook-form";

export interface FormFieldConfig extends Pick<ControllerProps, 'name' | 'rules'> {
  type: 'text' | 'date';
  placeholder?: string;
}
