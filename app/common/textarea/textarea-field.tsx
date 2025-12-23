import { forwardRef } from "react";
import { Control, useController } from "react-hook-form";

import { Textarea, TextareaProps } from "./textarea";
import { useMergeRefs } from "../../hooks/use-merge-refs";

export type TextareaFieldProps = Omit<TextareaProps, "value"> & {
  control: Control<any>;
  fieldName: string;
};

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(function TextareaField(props, ref) {
  const { control, fieldName, onChangeValue, ...rest } = props;
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
      onChangeValue={(val) => {
        onChangeValue?.(val);
        field.onChange(val);
      }}
      onBlur={field.onBlur}
      value={field.value || ""}
      fieldError={error}
      error={error?.message}
      {...rest}
    />
  );
});
