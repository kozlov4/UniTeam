import { motion } from "framer-motion";
import { faculties } from "./homeData";
import { fadeUp, staggerContainer } from "../../utils/animations";

export function FacultiesSection({ styles }) {
  return (
    <motion.section
      className={styles.faculties}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Факультети та спеціальності</h2>

      <motion.div
        className={styles.cards}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {faculties.map((item) => (
          <motion.article
            className={styles.card}
            key={item.id}
            variants={fadeUp}
            whileHover={{ y: -10 }}
          >
            <img src={item.image} alt={item.title} />

            <span>Факультет комп’ютерних наук</span>

            <div className={styles.avatars}>
              <img src="/avatar1.jpg" alt="avatar" />
              <img src="/avatar2.jpg" alt="avatar" />
              <img src="/avatar3.jpg" alt="avatar" />
              <img src="/avatar4.jpg" alt="avatar" />
            </div>

            <h3>{item.title}</h3>
            <p>Lorem ipsum tincidunt porttitor magna in ac dignissim sit nec.</p>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }}>
              Подати заявку
            </motion.button>
          </motion.article>
        ))}
      </motion.div>

      <motion.button
        className={styles.showMore}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
      >
        Переглянути всі ↓
      </motion.button>
    </motion.section>
  );
}