import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

export function Breadcrumbs({ styles }) {
  return (
    <motion.div className={styles.breadcrumbs} variants={fadeUp}>
      <Link to="/dashboard">Головна</Link>
      <span>›</span>
      <span className={styles.current}>Інформація про проєкт</span>
    </motion.div>
  );
}