import React from "react";
import styles from "./CardInfo.module.css";

function CardInfo({ title, value, variant = "light" }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <p className={styles.title}>{title}</p>

      <h2 className={styles.value}>{value}</h2>
    </div>
  );
}

export default CardInfo;
