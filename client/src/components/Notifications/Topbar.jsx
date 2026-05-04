import { motion } from "framer-motion";
import { Search, CalendarDays, ChevronDown } from "lucide-react";
import { fadeUp, stagger } from "./animations";

export function Topbar({ styles }) {
  return (
    <motion.header
      className={styles.topbar}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.search} variants={fadeUp}>
        <Search size={22} />
        <input type="text" placeholder="Пошук" />
      </motion.div>

      <motion.button className={styles.filter} variants={fadeUp}>
        <CalendarDays size={16} />
        Квітень
        <ChevronDown size={18} />
      </motion.button>

      <motion.button className={styles.filter} variants={fadeUp}>
        Тип
        <ChevronDown size={18} />
      </motion.button>

      <motion.div className={styles.user} variants={fadeUp}>
        <img src="/avatar1.jpg" />
        <span>Павло Павленко</span>
      </motion.div>
    </motion.header>
  );
}