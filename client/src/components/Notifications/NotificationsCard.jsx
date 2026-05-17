import { motion } from "framer-motion";
import { NotificationsList } from "./NotificationsList";
import { fadeUp } from "../../utils/animations";

export function NotificationsCard({
  styles,
  activeTab,
  setActiveTab,
  notifications,
  favoriteIds,
  toggleFavorite,
  deleteNotification,
}) {
  const filteredNotifications = notifications.filter(item => {
    if (activeTab === "favorites") return favoriteIds.includes(item.id);
    if (activeTab === "new") return item.isNew;
    return true; // "all"
  });

  const tabLabels = {
    all: "Усі",
    new: "Нові",
    favorites: "Обрані"
  };

  return (
    <motion.section className={styles.card}>
      <div className={styles.cardHeader}>
        <h1>Список сповіщень</h1>
      </div>

      <div className={styles.cardBody}>
        <motion.h2 variants={fadeUp}>
          {notifications.length} сповіщень
        </motion.h2>

        <div className={styles.tabs}>
          {Object.entries(tabLabels).map(([key, label]) => (
            <button
              key={key}
              className={activeTab === key ? styles.tabActive : ""}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <NotificationsList
          styles={styles}
          notifications={filteredNotifications}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
          deleteNotification={deleteNotification}
        />
      </div>
    </motion.section>
  );
}
