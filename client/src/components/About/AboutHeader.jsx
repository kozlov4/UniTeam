import { motion } from "framer-motion";

export function AboutHeader({ styles }) {
  return (
    <motion.header
      className={styles.header}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <motion.div className={styles.logo} whileHover={{ scale: 1.05 }}>
        Uniteam
        <div className={styles.logoDot}></div>
      </motion.div>

      <motion.div className={styles.user} whileHover={{ y: -2 }}>
        <img src="/avatar1.jpg" alt="user" />
        <span>Павло Павленко</span>
      </motion.div>
    </motion.header>
  );
}