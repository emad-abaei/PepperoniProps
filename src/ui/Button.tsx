import { FormEvent, ReactNode } from "react";
import { Link } from "react-router";

type ButtonVariantType = "primary" | "secondary" | "small" | "round";
type ButtonType = "button" | "submit";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  variant?: ButtonVariantType;
  onClick?: (e?: FormEvent) => void;
  type?: ButtonType;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

const base =
  "bg-amber-400 uppercase text-sm font-semibold text-stone-800 inline-block tracking-wide rounded-full transition-colors duration-300 cursor-pointer hover:bg-amber-300 focus:bg-amber-300 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300";

const styles = {
  primary: `${base} px-4 py-3 md:px-6 md:py-4`,
  small: `${base} px-4 py-2 md:px-5 md:py-2 text-xs`,
  round: `${base} px-2.5 py-1 md:px-3 md:py-1.5 text-sm`,
  secondary:
    "border-2 border-stone-300 uppercase text-sm font-semibold text-stone-400  inline-block tracking-wide rounded-full transition-colors duration-300 cursor-pointer hover:bg-stone-300 hover:text-stone-700 focus:bg-stone-300 focus:text-stone-700 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed py-2.5 px-4 md:px-6 md:py-3.5"
};

function Button({
  children,
  disabled,
  to,
  onClick,
  variant = "primary",
  type = "button",
  ariaLabel,
  ariaDescribedBy
}: ButtonProps) {
  if (to)
    return (
      <Link
        className={styles[variant]}
        to={to}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}>
        {children}
      </Link>
    );

  return (
    <button
      type={type}
      className={styles[variant]}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      aria-disabled={disabled ? "true" : "false"}
      aria-describedby={ariaDescribedBy}>
      {children}
    </button>
  );
}

export default Button;
