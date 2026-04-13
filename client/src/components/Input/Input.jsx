import React from "react";
import styles from "./Input.module.css";

function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  ...props
}) {
  return (
    <input
      className={`${styles.input} ${error ? styles.error : ""}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
