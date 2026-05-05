import React from "react";
import ChatList from "./ChatList";
import ChatListHeader from "./ChatListHeader";
import ChatSearch from "./ChatSearch";
import styles from "./ConversationList.module.css";

function ConversationList({ chats, selectedChatId, onSelectChat }) {
  return (
    <aside className={styles["chat-list-section"]}>
      <ChatListHeader />

      <div className={styles["chat-list-content"]}>
        <ChatSearch />

        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={onSelectChat}
        />
      </div>
    </aside>
  );
}

export default ConversationList;
