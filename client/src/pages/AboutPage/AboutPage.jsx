import { motion } from "framer-motion";
import styles from "./AboutPage.module.css";

import { AboutHeader } from "../../components/About/AboutHeader";
import { ProjectContent } from "../../components/About/ProjectContent";
import { ProjectSidebar } from "../../components/About/ProjectSidebar";

export default function AboutPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AboutHeader styles={styles} />

      <main className={styles.main}>
        <ProjectContent styles={styles} />
        <ProjectSidebar styles={styles} />
      </main>
    </motion.div>
  );
}