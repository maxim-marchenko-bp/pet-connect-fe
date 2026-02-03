import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren, useState } from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

type PasswordProps<T extends FieldValues> = PropsWithChildren<{
  name: FieldPath<T>;
  displayPrependIcon?: boolean;
}>;

export default function InputPassword<T extends FieldValues>({ name, displayPrependIcon = true }: PasswordProps<T>) {
  const { control } = useFormContext();
  const [ isPasswordShown, setIsPasswordShown ] = useState<boolean>(false);
  return (
    <FormField
      control={control}
      name={name}
      rules={{required: "Password is required"}}
      render={({ field, fieldState }) => (
        <FormItem>
          <InputGroup>
            {displayPrependIcon && <InputGroupAddon align="inline-start"><LockClosedIcon/></InputGroupAddon>}
            <InputGroupInput
              aria-invalid={fieldState.invalid}
              { ...field }
              placeholder="Password"
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
      />)
}
