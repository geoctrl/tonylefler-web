import { always } from "~/utils/classname-helpers";
import { ulid } from "ulid";
import { tv } from "tailwind-variants";
import {
  FormEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { RenderIcon } from "~/common/icon/render-icon";
import { IconsOrElement } from "~/types/icons";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string;
  onChange?: (value: string, event: FormEvent<HTMLInputElement>) => void;
  formSize?: "sm" | "md" | "lg";
  label?: string | ReactNode;
  iconLeft?: IconsOrElement;
  iconRight?: IconsOrElement;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value,
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
          className={tv({
            base: "block w-full bg-grey-100 align-middle text-base dark:border-grey-100/10 dark:bg-grey-100/5",
            variants: {
              size: {
                sm: "h-8 rounded-md px-2 text-sm",
                md: "h-10 rounded-lg px-3",
                lg: "h-12 rounded-lg px-4 text-lg",
              },
              iconLeft: {
                true: "pl-10",
              },
              iconRight: {
                true: "pr-10",
              },
            },
          })({
            size: formSize,
            iconLeft: !!iconLeft,
            iconRight: !!iconRight,
          })}
          onChange={(e) => {
            onChange?.(e.target.value, e);
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 flex size-10 items-center justify-center">
          <RenderIcon icon={iconLeft} />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex size-10 items-center justify-center">
          <RenderIcon icon={iconRight} />
        </div>
      </div>
    </div>
  );
});
