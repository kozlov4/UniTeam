import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import styles from "./MainPage.module.css";
import MainInfo from "../../../components/Admin/Main/MainInfo/MainInfo";
import { NotificationsCard } from "../../../components/Notifications/NotificationsCard";
import { notifications } from "../../../components/Notifications/notificationsData";
import { getMainInfo } from "../../../services/admin.service";

function MainPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mainInfo, setMainInfo] = useState({});

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const fetchMainInfo = async () => {
      setIsLoading(true);

      try {
        const data = await getMainInfo();
        setMainInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMainInfo();
  }, []);

  if (isLoading) {
    return <div>Завантаження!</div>;
  }

  return (
    <AdminLayout>
      <h1 className={styles.title}>Вітаємо!</h1>
      <MainInfo info={mainInfo} />
      <NotificationsCard
        styles={styles}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        favoriteIds={favoriteIds}
        toggleFavorite={toggleFavorite}
      />
    </AdminLayout>
  );
}

export default MainPage;
