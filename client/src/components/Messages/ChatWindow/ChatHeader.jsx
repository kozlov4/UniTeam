import React from "react";
import styles from "./ChatHeader.module.css";
import { Search, MoreVertical } from "lucide-react";
import avatar from "../../../assets/images/img_message.png";

function ChatHeader(props) {
  const user = { name: "Павло Павленко", avatar: avatar };
  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <img src={user.avatar} alt={"Аватар"} className={styles.avatar} />
        <span className={styles.name}>{user.name}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.iconBtn}>
          <Search size={24} />
        </button>
        <button className={styles.iconBtn}>
          <MoreVertical size={24} />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
