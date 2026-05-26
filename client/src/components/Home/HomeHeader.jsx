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
        <a href="#hero">Головна</a>
        <a href="#how">Про нас</a>
        <a href="#faq">Питання-відповіді</a>
        <a href="#reviews">Відгуки</a>
      </nav>

      <div className={styles.actions}>
        <div className={styles.langWrapper}>
          <motion.div
            className={styles.lang}
          >
            <img
              src="/ukr_flag.png"
              alt="language"
              className={styles.flag}
            />
            <span>Укр</span>
          </motion.div>
        </div>

        <Link
          to={localStorage.getItem("token") ? "/dashboard" : "/login"}
          className={styles.login}
        >
          Увійти
        </Link>
      </div>
    </motion.header>
  );
}