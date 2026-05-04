import { motion } from "framer-motion";
import {
  Grid2X2,
  FolderKanban,
  Users,
  Bell,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { fadeRight, stagger } from "./animations";

const icons = {
  Grid2X2,
  FolderKanban,
  Users,
  Bell,
  MessageSquare,
};

export function Sidebar({ styles, navItems }) {
  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ opacity: 0, x: -45 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className={styles.logo}>
        Uniteam
        <div className={styles.logoDot}></div>
      </div>

      <motion.nav variants={stagger} initial="hidden" animate="visible">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <motion.button
              key={item.label}
              className={`${styles.navItem} ${
                item.active ? styles.active : ""
              }`}
              variants={fadeRight}
              whileHover={{ x: 6 }}
            >
              <Icon size={20} />
              {item.label}
            </motion.button>
          );
        })}
      </motion.nav>

      <motion.button className={styles.logout} whileHover={{ x: 8 }}>
        <LogOut size={20} />
        Вихід
      </motion.button>
    </motion.aside>
  );
}