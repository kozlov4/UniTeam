import React from "react";
import styles from "./Input.module.css";

function Input({
  type = "text",
  value,
  name,
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
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
