import { Toggle, ToggleProps } from "./toggle";
import { Control, useController } from "react-hook-form";

export type ToggleFieldProps = Omit<ToggleProps, "checked" | "onChange"> & {
  control: Control<any>;
  fieldName: string;
};

export const ToggleField = (props: ToggleFieldProps) => {
  const { control, fieldName, ref, ...rest } = props;
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
      onValueChange={(checked) => {
        onChange(checked);
      }}
      {...rest}
    />
  );
};
