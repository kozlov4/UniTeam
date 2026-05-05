import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, CalendarDays, ChevronDown } from "lucide-react";
import { fadeUp, stagger } from "../../utils/animations";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const location = useLocation();
  const hideFilters = ["/dashboard", "/projects", "/participants"].includes(
    location.pathname,
  );

  return (
    <motion.header
      className={styles.topBar}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.searchContainer} variants={fadeUp}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Пошук"
            className={styles.searchInput}
          />
        </div>
      </motion.div>

      {!hideFilters && (
        <div className={styles.filters}>
          <motion.button className={styles.filterBtn} variants={fadeUp}>
            <CalendarDays size={18} />
            <span>Квітень</span>
            <ChevronDown size={18} />
          </motion.button>

          <motion.button className={styles.filterBtn} variants={fadeUp}>
            <span>Тип</span>
            <ChevronDown size={18} />
          </motion.button>
        </div>
      )}

      <motion.div className={styles.userProfile} variants={fadeUp}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Павло Павленко</span>
        </div>
        <div className={styles.avatar}>
          <img src="/avatar1.jpg" alt="User Avatar" />
        </div>
      </motion.div>
    </motion.header>
  );
};

export default TopBar;
