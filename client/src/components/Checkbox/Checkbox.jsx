import React from 'react';
import styles from "./Checkbox.module.css";

function Checkbox({checked, onChange, label, className="", ...props}) {
    return (
        <label className={`${styles.checkbox} ${className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          {...props}
        />
  
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
}

export default Checkbox;