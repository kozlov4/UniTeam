import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "./animations";

export function Breadcrumbs({ styles }) {
  return (
    <motion.div className={styles.breadcrumbs} variants={fadeUp}>
      <Link to="/">Головна</Link>
      <span>›</span>
      <span className={styles.current}>Подання заявки</span>
    </motion.div>
  );
}