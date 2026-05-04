import { useState } from "react";
import styles from "./NotificationsPage.module.css";
import MainLayout from "../../components/MainLayout/MainLayout";
import { NotificationsCard } from "../../components/Notifications/NotificationsCard";
import { notifications } from "../../components/Notifications/notificationsData";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [favoriteIds, setFavoriteIds] = useState([]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
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
        />
      </div>
    </MainLayout>
  );
}
