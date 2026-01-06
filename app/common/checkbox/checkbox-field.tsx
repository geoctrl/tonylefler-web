import { Control, useController } from "react-hook-form";

import { Checkbox, CheckboxProps } from "./checkbox";

type CheckboxFieldProps = Omit<CheckboxProps, "value"> & {
  control: Control<any>;
  fieldName: string;
};

export function CheckboxField(props: CheckboxFieldProps) {
  const { control, fieldName, onChangeValue, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
  });
  return (
    <Checkbox
      onChangeValue={(val) => {
        onChangeValue?.(val);
        field.onChange(val);
      }}
      onBlur={field.onBlur}
      checked={field.value}
      ref={field.ref}
      {...rest}
      fieldError={error}
    />
  );
}
