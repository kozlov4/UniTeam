import { motion } from "framer-motion";
import { stats } from "./homeData";
import { fadeUp, staggerContainer } from "../../utils/animations";

export function StatsSection({ styles }) {
  return (
    <motion.section
      className={styles.stats}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {stats.map(([number, text]) => (
        <motion.div key={number} variants={fadeUp}>
          <h3>{number}</h3>
          <p>{text}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}