import { Input, InputProps } from "./input";
import { Control, useController } from "react-hook-form";
import { forwardRef } from "react";
import { useMergeRefs } from "../../hooks/use-merge-refs";

export type InputFieldProps = Omit<InputProps, "value"> & {
  control: Control<any>;
  fieldName: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(props, ref) {
    const { control, fieldName, onChangeValue, ...rest } = props;
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
  },
);
