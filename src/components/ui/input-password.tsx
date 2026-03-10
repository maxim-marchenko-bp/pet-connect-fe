import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren, useState } from "react";
import { FieldPath, FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

export type PasswordProps<T extends FieldValues> = PropsWithChildren<{
  name: FieldPath<T>;
  displayPrependIcon?: boolean;
  placeholder?: string;
  rules?: RegisterOptions;
}>;

export default function InputPassword<T extends FieldValues>({ name, displayPrependIcon = true, placeholder = 'Password', rules }: PasswordProps<T>) {
  const { control } = useFormContext();
  const [ isPasswordShown, setIsPasswordShown ] = useState<boolean>(false);
  return (
    <FormField
      control={control}
      name={name}
      rules={rules ?? {required: `${placeholder} is required`}}
      render={({ field, fieldState }) => (
        <FormItem>
          <InputGroup>
            {displayPrependIcon && <InputGroupAddon align="inline-start"><LockClosedIcon/></InputGroupAddon>}
            <InputGroupInput
              aria-invalid={fieldState.invalid}
              { ...field }
              placeholder={placeholder}
              type={ isPasswordShown ? 'text' : 'password' }/>
            <InputGroupAddon align="inline-end">
              {
                isPasswordShown
                  ? <EyeIcon className="cursor-pointer" onClick={() => setIsPasswordShown(false)}/>
                  : <EyeSlashIcon className="cursor-pointer" onClick={() => setIsPasswordShown(true)}/>
              }
            </InputGroupAddon>
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
