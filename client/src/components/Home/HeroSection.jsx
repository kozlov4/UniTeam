import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

export function HeroSection({ styles }) {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <motion.div
        className={styles.heroOverlay}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeUp}>Зроби своє навчання кращим</motion.h1>

        <motion.p variants={fadeUp}>
          З нашою університетською платформою, яка допоможе знайти однодумців
        </motion.p>

        <Link to="/register">
          <motion.button
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            Створити акаунт →
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
}