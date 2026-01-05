import { Control, useController } from "react-hook-form";

import { Textarea, TextareaProps } from "./textarea";
import { useMergeRefs } from "../../hooks/use-merge-refs";

export type TextareaFieldProps = Omit<TextareaProps, "value"> & {
  control: Control<any>;
  fieldName: string;
};

export const TextareaField = (props: TextareaFieldProps) => {
  const { control, fieldName, onValueChange, ref, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
  });

  return (
    <Textarea
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
