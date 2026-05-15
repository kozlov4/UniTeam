import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2 } from "lucide-react";
import { fadeRight, stagger } from "../../utils/animations";

export function NotificationsList({
  styles,
  notifications,
  favoriteIds,
  toggleFavorite,
  deleteNotification,
}) {
  return (
    <motion.div
      className={styles.list}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            layout
            className={`${styles.notification} ${
              item.isNew ? styles.highlight : ""
            }`}
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            whileHover={{ x: 6 }}
          >
            <button
              className={`${styles.starBtn} ${
                favoriteIds.includes(item.id) ? styles.starActive : ""
              }`}
              onClick={() => toggleFavorite(item.id)}
            >
              <Star size={22} />
            </button>

            <p>{item.text}</p>
            <span className={styles.time}>{item.time}</span>

            <button 
              className={styles.deleteBtn}
              onClick={() => deleteNotification(item.id)}
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      {notifications.length === 0 && (
        <p className={styles.emptyState}>Сповіщень немає</p>
      )}
    </motion.div>
  );
}
