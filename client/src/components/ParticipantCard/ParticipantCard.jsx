import React from "react";
import { motion } from "framer-motion";
import styles from "./ParticipantCard.module.css";

const ParticipantCard = ({ participant }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.imageContainer}>
        <img src={participant.image} alt={participant.name} />
      </div>
      <div className={styles.content}>
        <div className={styles.tag}>Програмна інженерія – 3 курс</div>
        <h3 className={styles.name}>{participant.name}</h3>
        <p className={styles.description}>{participant.description}</p>
        <button className={styles.messageBtn}>Написати</button>
      </div>
    </motion.div>
  );
};

export default ParticipantCard;
