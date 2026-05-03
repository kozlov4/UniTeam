import React from "react";
import { Star, Clock3 } from "lucide-react";

import styles from "./ChatListItem.module.css";

function ChatListItem({ chat, isActive, onClick }) {
  return (
    <button
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <img src={chat.avatar} alt={chat.name} className={styles.avatar} />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{chat.name}</h3>

          <Star
            size={18}
            className={`${styles.star} ${
              chat.isFavorite ? styles.favorite : ""
            }`}
            color="#FE8D0F"
            fill={chat.isFavorite ? "#FE8D0F" : "transparent"}
          />
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.message}>{chat.lastMessage}</p>
        </div>
        <div className={styles.containerTime}>
          <Clock3 size={"13px"} color="#AFB8CF" />
          <span className={styles.time}>
            {/* Тут дату обчислити та вставити */}Сьогодні | {chat.time}
          </span>
        </div>
      </div>
    </button>
  );
}

export default ChatListItem;
