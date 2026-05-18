import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../../../utils/animations";
import styles from "./BreadCrumbs.module.css";

function BreadCrumbs() {
  return (
    <motion.div className={styles.breadcrumbs} variants={fadeUp}>
      <Link to="/dashboard">Головна</Link>
      <span>›</span>
      <span className={styles.current}>Редагування профілю</span>
    </motion.div>
  );
}

export default BreadCrumbs;
