import { Controller, useFormContext } from "react-hook-form"
import Input, { InputProps } from "@/components/form/input/InputField"

type RHFInputProps = Omit<InputProps, "name"> & {
  name: string
}

export function RHFInput({ name, ...props }: RHFInputProps) {
  const { control, formState } = useFormContext()
  const error = formState.errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Input {...field} {...props} error={!!error} hint={error?.message?.toString()} />}
    />
  )
}
