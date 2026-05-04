import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../TopBar/TopBar";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />
        <motion.main
          className={styles.content}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
