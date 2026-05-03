import React, { useState } from "react";
import styles from "./TechnologiesSection.module.css";
import ic_drop from "../../../assets/icons/ic_drop.svg";

function TechnologiesSection({ formData, setFormData, technologies }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTechChange = (techId) => {
    if (formData.technologies.includes(techId)) {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((id) => id !== techId),
      });
    } else {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techId],
      });
    }
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Основні технології</h3>
      <div className={styles.selectWrapper}>
        <button
          type="button"
          className={styles.selectButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {formData.technologies && formData.technologies.length > 0
              ? `Обрано: ${formData.technologies.length}`
              : "Список технологій"}
          </span>
          <img
            src={ic_drop}
            alt="icon drop"
            className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          />
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            {technologies.map((tech) => (
              <label key={tech.id} className={styles.option}>
                <input
                  type="checkbox"
                  checked={formData.technologies?.includes(tech.id) || false}
                  onChange={() => handleTechChange(tech.id)}
                  className={styles.checkbox}
                />
                <span className={styles.optionText}>{tech.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologiesSection;
