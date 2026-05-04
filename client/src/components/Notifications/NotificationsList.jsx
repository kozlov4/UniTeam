import { motion } from "framer-motion";
import { Star, Trash2 } from "lucide-react";
import { fadeRight, stagger } from "../../utils/animations";

export function NotificationsList({
  styles,
  notifications,
  favoriteIds,
  toggleFavorite,
}) {
  return (
    <motion.div
      className={styles.list}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {notifications.map((item, index) => (
        <motion.div
          key={item.id}
          className={`${styles.notification} ${
            index === 3 ? styles.highlight : ""
          }`}
          variants={fadeRight}
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

          <button className={styles.deleteBtn}>
            <Trash2 size={16} />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}