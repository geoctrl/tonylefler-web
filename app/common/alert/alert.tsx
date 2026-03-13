import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../icon/icon";
import { IconName } from "~/types/icon-gen";
import { alertVariants } from "./alert-variants";

export type AlertIntent = "info" | "success" | "warning" | "error";

const defaultIconMap: Record<AlertIntent, IconName> = {
  info: "file-lines",
  success: "check-small",
  warning: "eye",
  error: "xmark",
};

export type AlertProps = Omit<ComponentProps<"div">, "title"> & {
  /**
   * Visual style and semantic meaning of the alert
   * @default "info"
   */
  intent?: AlertIntent;

  /**
   * Optional heading displayed above the body content
   */
  title?: string;

  /**
   * Override the default icon for the current intent
   * @docType IconName
   */
  icon?: IconName;

  /**
   * Callback fired when the dismiss button is clicked. When provided, a dismiss button is rendered.
   */
  onDismiss?: () => void;
};

export function Alert(props: AlertProps) {
  const {
    intent = "info",
    title,
    children,
    icon,
    onDismiss,
    className,
    ...rest
  } = props;

  const slots = alertVariants({ intent });
  const resolvedIcon = icon ?? defaultIconMap[intent];

  // "error" and "warning" intents are assertive alerts; "info" and "success" are polite status messages
  const role = intent === "error" || intent === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
      className={twMerge(slots.root(), className)}
      {...rest}
    >
      <Icon name={resolvedIcon} className={slots.icon()} aria-hidden="true" />

      <div className={slots.content()}>
        {title && <p className={slots.title()}>{title}</p>}
        {children && <div className={slots.body()}>{children}</div>}
      </div>

      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className={slots.dismiss()}
        >
          <Icon name="xmark" className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
