import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./ChatListHeader.module.css";

function ChatListHeader() {
  return (
    <div className={styles.header}>
      <button className={styles.button}>
        <span>Усі повідомлення</span>

        <ChevronDown size={18} />
      </button>
    </div>
  );
}

export default ChatListHeader;
