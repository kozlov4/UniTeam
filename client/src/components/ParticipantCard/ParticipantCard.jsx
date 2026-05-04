import React from 'react';
import styles from './ParticipantCard.module.css';

const ParticipantCard = ({ participant }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={participant.image} alt={participant.name} />
      </div>
      <div className={styles.content}>
        <div className={styles.tag}>Програмна інженерія – 3 курс</div>
        <h3 className={styles.name}>{participant.name}</h3>
        <p className={styles.description}>{participant.description}</p>
        <button className={styles.messageBtn}>Написати</button>
      </div>
    </div>
  );
};

export default ParticipantCard;
