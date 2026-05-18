import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { menuItems, footerItems } from "../../router/navigation";
import { fadeRight, stagger } from "../../utils/animations";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ opacity: 0, x: -45 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <motion.nav
        className={styles.nav}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item) => (
          <motion.div key={item.path} variants={fadeRight} whileHover={{ x: 6 }}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
              end={item.path === "/dashboard"}
            >
              <item.icon size={22} className={styles.icon} />
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>

      <div className={styles.footer}>
        {footerItems.map((item) => (
          <motion.div key={item.path}>
            {item.path === "/login" || item.className === "logout" ? (
              <button
                className={`${styles.navItemBtn} ${styles.logout}`}
                onClick={handleLogout}
              >
                <item.icon size={22} className={styles.icon} />
                {item.label}
              </button>
            ) : item.type === "button" ? (
              <button
                className={`${styles.navItemBtn} ${
                  item.className ? styles[item.className] : ""
                }`}
              >
                <item.icon size={22} className={styles.icon} />
                {item.label}
              </button>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active} ${
                        item.className ? styles[item.className] : ""
                      }`
                    : `${styles.navItem} ${
                        item.className ? styles[item.className] : ""
                      }`
                }
              >
                <item.icon size={22} className={styles.icon} />
                {item.label}
              </NavLink>
            )}
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
