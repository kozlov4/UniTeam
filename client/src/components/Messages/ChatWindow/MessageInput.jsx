import React, { useState } from "react";
import styles from "./MessageInput.module.css";
import { Plus } from "lucide-react";
import ic_smile from "../../../assets/icons/ic_smile.svg";

function MessageInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };
  return (
    <div className={styles.inputBar}>
      <button className={styles.iconBtn}>
        <img src={ic_smile} alt="Смайл" />
      </button>
      <input
        className={styles.input}
        type="text"
        placeholder="Написати повідомлення..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.sendBtn} onClick={handleSend}>
        <Plus size={20} />
      </button>
    </div>
  );
}

export default MessageInput;
