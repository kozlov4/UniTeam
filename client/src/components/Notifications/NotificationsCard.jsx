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
}) {
  return (
    <motion.section className={styles.card}>
      <div className={styles.cardHeader}>
        <h1>Список сповіщень</h1>
      </div>

      <div className={styles.cardBody}>
        <motion.h2 variants={fadeUp}>10 Сповіщень</motion.h2>

        <div className={styles.tabs}>
          {["all", "deleted", "favorites"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? styles.tabActive : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <NotificationsList
          styles={styles}
          notifications={notifications}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </motion.section>
  );
}