import { always } from "../../utils/classname-helpers";
import { ulid } from "ulid";
import {
  FormEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { useIconFormSize } from "../../hooks/use-icon-form-size";
import { inputVariants } from "./input-variants";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string;
  onChange?: (value: string, event: FormEvent<HTMLInputElement>) => void;
  formSize?: "sm" | "md" | "lg";
  label?: string | ReactNode;
  iconLeft?: IconOrElement;
  iconRight?: IconOrElement;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    formSize = "md",
    onChange,
    label,
    style,
    className,
    iconLeft,
    iconRight,
    ...inputProps
  } = props;

  const [id, setId] = useState("");

  useEffect(() => {
    setId(props.id || ulid());
  }, []);

  const iconSize = useIconFormSize(formSize);

  return (
    <div className={always("align-middle", className)} style={style}>
      {!!label && (
        <div className="typo-label">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="relative">
        <input
          {...inputProps}
          id={id}
          className={inputVariants({
            size: formSize,
            iconLeft: !!iconLeft,
            iconRight: !!iconRight,
          })}
          onChange={(e) => {
            onChange?.(e.target.value, e);
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 flex size-10 items-center justify-center">
          <RenderIconOrElement iconOrElement={iconLeft} className={iconSize} />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex size-10 items-center justify-center">
          <RenderIconOrElement iconOrElement={iconRight} className={iconSize} />
        </div>
      </div>
    </div>
  );
});
