import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./animations";

export function HowItWorksSection({ styles }) {
  return (
    <motion.section
      className={styles.how}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <h2>Як працює UniTeam?</h2>

      <motion.div
        className={styles.steps}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeUp}>
          <h3>01</h3>
          <h4>Створи акаунт</h4>
          <p>Вкажи електронну пошту з доменною поштою та пароль.</p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3>02</h3>
          <h4>Обери команду</h4>
          <p>
            Скористайся фільтром та пошуком, щоб знайти команду відповідно
            предмету, спеціальності або інтересам.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3>03</h3>
          <h4>Надішли запит</h4>
          <p>
            Ознайомся з діяльності команди та надішли запит на приєднання, а
            далі очікуй відповідь.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}