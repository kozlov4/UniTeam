import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./NotificationsPage.module.css";

import { Sidebar } from "../../components/Notifications/Sidebar";
import { Topbar } from "../../components/Notifications/Topbar";
import { NotificationsCard } from "../../components/Notifications/NotificationsCard";

import {
  notifications,
  navItems,
} from "../../components/Notifications/notificationsData";

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
    <motion.div className={styles.page}>
      <Sidebar styles={styles} navItems={navItems} />

      <main className={styles.content}>
        <Topbar styles={styles} />

        <NotificationsCard
          styles={styles}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          notifications={notifications}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
        />
      </main>
    </motion.div>
  );
}