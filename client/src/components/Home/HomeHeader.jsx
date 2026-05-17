import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeDown } from "../../utils/animations";
import Logo from "../Logo/Logo";

export function HomeHeader({ styles }) {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Укр");

  return (
    <motion.header
      className={styles.header}
      variants={fadeDown}
      initial="hidden"
      animate="visible"
    >
      <Logo />

      <nav className={styles.nav}>
        <Link to="/">Головна</Link>
        <a href="#how">Про нас</a>
        <a href="#faq">Питання-відповіді</a>
        <a href="#reviews">Відгуки</a>
      </nav>

      <div className={styles.actions}>
        <div className={styles.langWrapper}>
          <motion.button
            className={styles.lang}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLangOpen((prev) => !prev)}
          >
            <img
              src={selectedLang === "Укр" ? "/ukr_flag.png" : "/gb.png"}
              alt="language"
              className={styles.flag}
            />
            <span>{selectedLang}</span>
            <span className={styles.arrow}>▾</span>
          </motion.button>

          {langOpen && (
            <motion.div
              className={styles.langMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => {
                  setSelectedLang("Укр");
                  setLangOpen(false);
                }}
              >
                <img src="/ukr_flag.png" alt="ukr" className={styles.flag} />
                Укр
              </button>

              <button
                onClick={() => {
                  setSelectedLang("Eng");
                  setLangOpen(false);
                }}
              >
                <img src="/gb.png" alt="eng" className={styles.flag} />
                Eng
              </button>
            </motion.div>
          )}
        </div>

        <Link
          to={localStorage.getItem("token") ? "/dashboard" : "/login"}
          className={styles.login}
        >
          {localStorage.getItem("token") ? "Увійти" : "Увійти"}
        </Link>
      </div>
    </motion.header>
  );
}