import React from "react";
import styles from "./ChatList.module.css";
import ChatListItem from "./ChatListItem";

function ChatList({ chats, selectedChatId, onSelectChat }) {
  return (
    <div className={styles.list}>
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isActive={selectedChatId === chat.id}
          onClick={() => onSelectChat(chat.id)}
        />
      ))}
    </div>
  );
}

export default ChatList;
