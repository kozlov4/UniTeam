import React from "react";
import { Search } from "lucide-react";
import styles from "./ChatSearch.module.css";

function ChatSearch() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <Search size={18} className={styles.icon} />

        <input type="text" placeholder="Знайти чат" className={styles.input} />
      </div>
    </div>
  );
}

export default ChatSearch;
