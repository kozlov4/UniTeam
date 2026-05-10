import React from "react";
import { motion } from "framer-motion";
import styles from "./ParticipantCard.module.css";

const ParticipantCard = ({ participant }) => {
  const fullName = `${participant.first_name || ""} ${participant.last_name || ""}`.trim() || "Користувач";
  const tagText = [participant.specialty_name, participant.course_year ? `${participant.course_year} курс` : null]
    .filter(Boolean)
    .join(" – ") || "Студент";

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.imageContainer}>
        <img 
          src={participant.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.id || 'default'}`} 
          alt={fullName} 
        />
      </div>
      <div className={styles.content}>
        <div className={styles.tag}>{tagText}</div>
        <h3 className={styles.name}>{fullName}</h3>
        <p className={styles.description}>{participant.bio_description || participant.description || "Опис відсутній"}</p>
        <button className={styles.messageBtn}>Написати</button>
      </div>
    </motion.div>
  );
};

export default ParticipantCard;
