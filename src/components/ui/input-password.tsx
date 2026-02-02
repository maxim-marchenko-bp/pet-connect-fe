import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Field, FieldError } from "@/components/ui/field";
import { PropsWithChildren, useState } from "react";
import { FieldPath, FieldValues, useFormContext, useFormState } from "react-hook-form";

type PasswordProps<T extends FieldValues> = PropsWithChildren<{
  name: FieldPath<T>;
}>;

export default function InputPassword<T extends FieldValues>({ name }: PasswordProps<T>) {
  const { register, control } = useFormContext();
  const { errors } = useFormState({
    control,
    name,
  });
  const error = errors?.[name];
  const [ isPasswordShown, setIsPasswordShown ] = useState<boolean>(false);
  return (
    <Field data-invalid={!!error}>
      <InputGroup>
        <InputGroupAddon align="inline-start"><LockClosedIcon/></InputGroupAddon>
        <InputGroupInput
          aria-invalid={!!error}
          { ...register(name, { required: 'This field is required' }) }
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
      <FieldError errors={[error]}/>
    </Field>
  )
}
