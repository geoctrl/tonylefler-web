import React, { createContext, useContext } from "react";
import { radioGroupVariants } from "./radio-group-variants";

export type RadioOption = {
  /** The text label displayed next to the radio input */
  label: string;
  /** The value submitted when this option is selected */
  value: string;
  /** Optional secondary description shown below the label */
  description?: string;
  /** Disables this individual option */
  disabled?: boolean;
};

type RadioGroupContextValue = {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled: boolean;
  formSize: "sm" | "md" | "lg";
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("Radio must be used inside a RadioGroup");
  }
  return ctx;
}

// ─────────────────────────────────────────────
// RadioItem – individual radio input
// ─────────────────────────────────────────────

export type RadioProps = {
  /** The value this radio represents */
  value: string;
  /** Label text for the radio option */
  label?: string;
  /** Optional description below the label */
  description?: string;
  /** Disables this individual radio */
  disabled?: boolean;
  /** Additional class names for the item wrapper */
  className?: string;
};

export const Radio = (props: RadioProps) => {
  const { value, label, description, disabled: itemDisabled, className } = props;
  const ctx = useRadioGroupContext();

  const isChecked = ctx.value === value;
  const isDisabled = itemDisabled || ctx.disabled;

  const slots = radioGroupVariants({
    formSize: ctx.formSize,
    checked: isChecked,
    disabled: isDisabled,
  });

  return (
    <label className={slots.item({ class: className })}>
      <div className={slots.radioWrapper()}>
        <input
          type="radio"
          name={ctx.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          className={slots.radioInput()}
          onChange={() => {
            if (!isDisabled) {
              ctx.onChange(value);
            }
          }}
          role="radio"
          aria-checked={isChecked}
        />
        <div className={slots.radioCircle()}>
          <div className={slots.radioDot()} />
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className={slots.label()}>{label}</span>
          )}
          {description && (
            <span className={slots.description()}>{description}</span>
          )}
        </div>
      )}
    </label>
  );
};

// ─────────────────────────────────────────────
// RadioGroup – container
// ─────────────────────────────────────────────

export type RadioGroupProps = {
  /**
   * The currently selected value (controlled)
   */
  value?: string;

  /**
   * Callback when the selected value changes
   */
  onChange?: (value: string) => void;

  /**
   * HTML name attribute shared across all radio inputs in the group
   */
  name: string;

  /**
   * Disables all radio options in the group
   * @default false
   */
  disabled?: boolean;

  /**
   * Size of the radio group controls
   * @default "md"
   */
  formSize?: "sm" | "md" | "lg";

  /**
   * Layout direction of the radio items
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";

  /**
   * Predefined options to render. Use this or children, not both.
   * @docType RadioOption[]
   */
  options?: RadioOption[];

  /**
   * Custom radio items as children. Use this or options, not both.
   */
  children?: React.ReactNode;

  /** Additional class names for the group wrapper */
  className?: string;

  /** Accessible label for the group (use aria-labelledby if you have a visible label) */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    value,
    onChange,
    name,
    disabled = false,
    formSize = "md",
    orientation = "vertical",
    options,
    children,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
  } = props;

  const slots = radioGroupVariants({ orientation, formSize });

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value,
        onChange: onChange ?? (() => {}),
        disabled,
        formSize,
      }}
    >
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        className={slots.group({ class: className })}
      >
        {options
          ? options.map((opt) => (
              <Radio
                key={opt.value}
                value={opt.value}
                label={opt.label}
                description={opt.description}
                disabled={opt.disabled}
              />
            ))
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
};
