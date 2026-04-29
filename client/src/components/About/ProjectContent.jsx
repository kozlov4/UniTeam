import { motion } from "framer-motion";
import { Breadcrumbs } from "./Breadcrumbs";
import { fadeUp, stagger } from "./animations";
import { searchRoles } from "./aboutData";

export function ProjectContent({ styles }) {
  return (
    <motion.section
      className={styles.left}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <Breadcrumbs styles={styles} />

      <motion.h1 variants={fadeUp}>
        Програмна система для контролю якості повітря
      </motion.h1>

      <motion.div className={styles.textBlock} variants={fadeUp} whileHover={{ y: -4 }}>
        <h3>Мета проекту</h3>
        <p>
          Розробка програмної системи для моніторингу, аналізу та візуалізації
          показників якості повітря...
        </p>
      </motion.div>

      <motion.div className={styles.textBlock} variants={fadeUp} whileHover={{ y: -4 }}>
        <h3>Опис проекту</h3>

        <p>Програмна система призначена для збору даних із датчиків...</p>

        <ul>
          <li>збереження та обробку отриманих даних;</li>
          <li>відображення інформації у вигляді графіків;</li>
          <li>сповіщення користувачів;</li>
          <li>аналіз змін показників;</li>
          <li>історичні дані;</li>
        </ul>
      </motion.div>

      <motion.div className={styles.teamSearch} variants={fadeUp}>
        <h3>Шукаємо в команду</h3>

        <motion.div className={styles.tags} variants={stagger}>
          {searchRoles.map((tag, i) => (
            <motion.span key={i} variants={fadeUp} whileHover={{ scale: 1.08 }}>
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        className={styles.applyBtn}
        variants={fadeUp}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        Подати заявку
      </motion.button>
    </motion.section>
  );
}