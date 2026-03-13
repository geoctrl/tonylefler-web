import { Select, SelectProps } from "./select";
import { Control, useController } from "react-hook-form";
import { forwardRef } from "react";
import { useMergeRefs } from "../../hooks/use-merge-refs";

export type InputFieldProps = Omit<SelectProps, "value"> & {
  control: Control<any>;
  fieldName: string;
};

export const SelectField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(props, ref) {
    const { control, fieldName, renderTrigger, onChange, ...rest } = props;
    const {
      field,
      fieldState: { error },
    } = useController({
      name: fieldName,
      control,
    });

    return (
      <Select
        fieldError={error}
        renderTrigger={({ refProps, opts }) => {
          return renderTrigger({
            refProps: {
              ...refProps,
              ref: useMergeRefs([refProps.ref, ref]),
              onBlur: field.onBlur,
            },
            opts: {
              ...opts,
              selectedOption: field.value,
            },
          });
        }}
        onChange={(val) => {
          onChange?.(val);
          field.onChange(val);
        }}
        value={field.value}
        {...rest}
      />
    );
  },
);
