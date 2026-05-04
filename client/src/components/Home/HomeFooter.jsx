import { motion } from "framer-motion";
import { fadeUp } from "./animations";

export function HomeFooter({ styles }) {
  return (
    <motion.footer
      className={styles.footer}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div>
        <div className={styles.logo}>
          Uniteam
          <div className={styles.logoDot}></div>
        </div>
        <small>© Uniteam 2026 — All rights reserved</small>
      </div>

      <div>
        <h4>Сторінки</h4>
        <a href="#">Головна</a>
        <a href="#">Про нас</a>
        <a href="#">Питання-відповіді</a>
        <a href="#">Відгуки</a>
      </div>

      <div>
        <h4>Зв’язатися з нами</h4>
        <p>uniteam@gmail.com</p>
        <p>+380667778899</p>
      </div>

      <div>
        <h4>Слідкуй за нами тут</h4>
        <div className={styles.socials}>
          <span>f</span>
          <span>◎</span>
          <span>▶</span>
          <span>✈</span>
        </div>
      </div>

      <motion.button
        className={styles.up}
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Вверх
      </motion.button>
    </motion.footer>
  );
}