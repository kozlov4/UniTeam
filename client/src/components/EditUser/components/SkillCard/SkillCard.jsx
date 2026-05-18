import React from "react";
import { X } from "lucide-react";
import styles from "./SkillCard.module.css";

const SkillCard = ({ skill, onRemove }) => (
  <div className={styles.skillCard}>
    <span>{skill.name}</span>
    <button
      type="button"
      onClick={() => onRemove(skill.id)}
      className={styles.removeBtn}
    >
      <X size={12} />
    </button>
  </div>
);

export default SkillCard;
