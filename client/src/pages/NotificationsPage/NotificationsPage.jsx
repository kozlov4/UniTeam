import { useState } from "react";
import styles from "./NotificationsPage.module.css";
import MainLayout from "../../components/MainLayout/MainLayout";
import { NotificationsCard } from "../../components/Notifications/NotificationsCard";
import { notifications as initialNotifications } from "../../components/Notifications/notificationsData";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MainLayout>
      <div className={styles.pageContent}>
        <NotificationsCard
          styles={styles}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          notifications={notifications}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
          deleteNotification={deleteNotification}
        />
      </div>
    </MainLayout>
  );
}
