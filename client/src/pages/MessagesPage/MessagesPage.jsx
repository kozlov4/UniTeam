import React, { useState } from "react";
import ConversationList from "../../components/Messages/ConversationList/ConversationList";
import styles from "./MessagesPage.module.css";

import image_message1 from "../../assets/images/img_message.png";
import image_message2 from "../../assets/images/img_message2.png";
import ChatWindow from "../../components/Messages/ChatWindow/ChatWindow";
const chats = [
  {
    id: 1,
    name: "Анна Коваленко",
    lastMessage:
      "Lorem ipsum id vestibulum arcu egestas amet feugiat in egestas tincidunt lacus.",
    time: "17:14",
    avatar: image_message1,
    isFavorite: true,
  },
  {
    id: 2,
    name: "Олександр Петренко",
    lastMessage:
      "Lorem ipsum id vestibulum arcu egestas amet feugiat in egestas tincidunt lacus.",
    time: "16:48",
    avatar: image_message2,
    isFavorite: false,
  },
  {
    id: 3,
    name: "Ірина Шевченко",
    lastMessage:
      "Lorem ipsum id vestibulum arcu egestas amet feugiat in egestas tincidunt lacus.",
    time: "15:22",
    avatar: image_message1,
    isFavorite: true,
  },
  {
    id: 4,
    name: "Максим Бондар",
    lastMessage:
      "Lorem ipsum id vestibulum arcu egestas amet feugiat in egestas tincidunt lacus.",
    time: "14:05",
    avatar: image_message2,
    isFavorite: false,
  },
  {
    id: 5,
    name: "Катерина Мельник",
    lastMessage:
      "Lorem ipsum id vestibulum arcu egestas amet feugiat in egestas tincidunt lacus.",
    time: "12:41",
    avatar: image_message1,
    isFavorite: false,
  },
  {
    id: 6,
    name: "Дмитро Сидоренко",
    lastMessage:
      "Lorem ipsum id vestibulum arcu egestas amet feugiat in egestas tincidunt lacus.",
    time: "11:19",
    avatar: image_message2,
    isFavorite: true,
  },
  {
    id: 7,
    name: "Марія Литвин",
    lastMessage:
      "Lorem ipsum id vestibulum arcu egestas amet feugiat in egestas tincidunt lacus.",
    time: "09:56",
    avatar: image_message1,
    isFavorite: false,
  },
];

function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div>
      <div className={styles.page}>
        {/* <SidebarNavigation /> тут додати sidevar який ви зробили */}

        <ConversationList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />

        <ChatWindow selectedChat={selectedChatId} />
      </div>
    </div>
  );
}

export default MessagesPage;
