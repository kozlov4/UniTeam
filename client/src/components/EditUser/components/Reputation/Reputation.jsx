import React from "react";
import styles from "./Reputation.module.css";

import ic_shield from "../../../../assets/icons/ic_shield.png";
import ic_python from "../../../../assets/icons/ic_python.png";
import ic_clock from "../../../../assets/icons/ic_clock.svg";

const REPUTATION_DATA = [
  {
    id: 1,
    title: "Надійний партнер",
    icon: ic_shield,
    type: "blue",
  },
  {
    id: 2,
    title: "Middle Python",
    icon: ic_python,
    type: "yellow",
  },
  {
    id: 3,
    title: "Король дедлайнів",
    icon: ic_clock,
    type: "green",
  },
];

function Reputation() {
  return (
    <div className={styles.section}>
      <h3 className={styles.mainTitle}>Репутація</h3>

      <div className={styles.cardsGrid}>
        {REPUTATION_DATA.map((item) => (
          <div key={item.id} className={`${styles.card} ${styles[item.type]}`}>
            <div className={styles.iconWrapper}>
              <img src={item.icon} alt={item.title} className={styles.icon} />
            </div>
            <span className={styles.cardTitle}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reputation;
