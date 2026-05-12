import React from 'react';
import styles from "./AdminLayout.module.css";
import Sidebar from "../Sidebar/Sidebar"
import { motion } from "framer-motion";

function AdminLayout({ children }) {
    return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
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
}

export default AdminLayout;