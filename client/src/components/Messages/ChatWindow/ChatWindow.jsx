import React, { useState } from "react";
import styles from "./ChatWindow.module.css";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

const initialMessages = [
  { id: 1, text: "Привіт! Як справи?", isOwn: false, time: "16:45" },
  {
    id: 2,
    text: "Все добре, дякую! А у тебе? Все добре, дякую! А у тебе? Все добре, дякую! А у тебе?",
    isOwn: true,
    time: "16:46",
  },
  {
    id: 3,
    text: "Теж чудово. Коли здаємо проєкт?",
    isOwn: false,
    time: "16:48",
  },
  { id: 4, text: "Завтра до обіду.", isOwn: true, time: "16:50" },
];

function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState(initialMessages);

  if (!selectedChat) return <div className={styles.empty}>Оберіть чат</div>;

  const handleSend = (text) => {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, isOwn: true, time },
    ]);
  };

  return (
    <section className={styles.chatWindow}>
      <ChatHeader />

      <MessagesList messages={messages} />

      <MessageInput onSend={handleSend} />
    </section>
  );
}

export default ChatWindow;
