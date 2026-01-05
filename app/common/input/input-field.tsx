import { Input, InputProps } from "./input";
import { Control, useController } from "react-hook-form";
import { useMergeRefs } from "../../hooks/use-merge-refs";

export type InputFieldProps = Omit<InputProps, "value"> & {
  control: Control<any>;
  fieldName: string;
};

export const InputField = (props: InputFieldProps) => {
  const { control, fieldName, onValueChange, ref, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
  });

  return (
    <Input
      ref={useMergeRefs([field.ref, ref])}
      onValueChange={(val) => {
        onValueChange?.(val);
        field.onChange(val);
      }}
      onBlur={field.onBlur}
      value={field.value || ""}
      fieldError={error}
      error={error?.message}
      {...rest}
    />
  );
};
