import React from "react";
import styles from "./Input.module.css";

function Input({ label, placeholder, value, onChange, type = "text", name }) {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
