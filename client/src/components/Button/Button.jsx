import React from "react";
import styles from "./Button.module.css";

function Button({
  children,
  type = "button",
  fullWidth = false,
  isDisabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
