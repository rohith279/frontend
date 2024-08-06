import {ButtonHTMLAttributes, forwardRef} from "react";
import styles from "./Button.module.css";

const Button = forwardRef<HTMLButtonElement>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        disabled={disabled}
        ref={ref}
        className={ styles.button + " " + className }
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
