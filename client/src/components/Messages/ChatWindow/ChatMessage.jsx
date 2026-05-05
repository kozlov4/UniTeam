import React from "react";
import styles from "./ChatMessage.module.css";

function ChatMessage({ message }) {
  return (
    <div
      className={`${styles.wrapper} ${message.isOwn ? styles.own : styles.other}`}
    >
      <div
        className={`${styles.bubble} ${message.isOwn ? styles.bubbleOwn : styles.bubbleOther}`}
      >
        <p className={styles.text}>{message.text}</p>
      </div>
      <span className={styles.time}>{message.time}</span>
    </div>
  );
}

export default ChatMessage;
