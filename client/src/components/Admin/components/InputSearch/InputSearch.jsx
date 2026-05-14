// InputSearch.jsx
import React from "react";
import styles from "./InputSearch.module.css";
import { Search } from "lucide-react";

const InputSearch = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.searchContainer}>
      <Search className={styles.icon} size={20} />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputSearch;
