import { Toggle, ToggleProps } from "./toggle";
import { Control, useController } from "react-hook-form";
import { forwardRef } from "react";

export type ToggleFieldProps = Omit<ToggleProps, "checked" | "onChange"> & {
  control: Control<any>;
  fieldName: string;
};

export const ToggleField = forwardRef<HTMLDivElement, ToggleFieldProps>(
  function ToggleField(props, ref) {
    const { control, fieldName, ...rest } = props;
    const {
      field: { onChange, value },
    } = useController({
      name: fieldName,
      control,
    });

    return (
      <Toggle
        ref={ref}
        checked={!!value}
        onChange={(checked) => {
          onChange(checked);
        }}
        {...rest}
      />
    );
  },
);
