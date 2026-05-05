import React from "react";
import styles from "./MessagesList.module.css";
import ChatMessage from "./ChatMessage";

function MessagesList({ messages }) {
  return (
    <div className={styles.messages}>
      <div className={styles.dateDivider}>Сьогодні | 16:45</div>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}

export default MessagesList;
