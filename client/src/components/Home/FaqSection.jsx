import { motion } from "framer-motion";
import { faqQuestions } from "./homeData";
import { fadeUp, staggerContainer } from "../../utils/animations";

export function FaqSection({ styles }) {
  return (
    <motion.section
      id="faq"
      className={styles.faq}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Питання та відповіді</h2>

      <motion.div
        className={styles.faqBox}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {faqQuestions.map((question) => (
          <motion.div
            className={styles.faqItem}
            key={question}
            variants={fadeUp}
            whileHover={{ x: 6 }}
          >
            <p>{question}</p>
            <span>+</span>
          </motion.div>
        ))}

        <motion.div className={styles.faqOpen} variants={fadeUp}>
          <div>
            <p>Чи можна бути учасником декількох команд?</p>
            <span>−</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur. Sit diam eros diam quam
            magna in natoque non platea.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}