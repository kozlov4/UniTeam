import React, { useState } from "react";
import styles from "./TechnologiesSection.module.css";
import { X, ChevronDown } from "lucide-react";

function TechnologiesSection({ technologies, formData, setFormData }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (tech) => {
    if (!formData.technologies.some((t) => t.id === tech.id)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tech],
      });
    }
    setIsOpen(false);
  };

  const handleRemove = (id) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t.id !== id),
    });
  };

  const availableTechnologies = technologies.filter(
    (tech) => !formData.technologies.some((t) => t.id === tech.id),
  );
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Основні технології</h3>

      <div className={styles.tagsWrapper}>
        {formData.technologies.map((tech) => (
          <div key={tech.id} className={styles.techTag}>
            <span>{tech.name}</span>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => handleRemove(tech.id)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <div className={styles.dropdownContainer}>
          <div
            className={styles.selectTrigger}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Список технологій</span>
            <ChevronDown
              className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
              size={18}
            />
          </div>

          {isOpen && (
            <div className={styles.dropdownMenu}>
              {availableTechnologies.length > 0 ? (
                availableTechnologies.map((tech) => (
                  <div
                    key={tech.id}
                    className={styles.dropdownItem}
                    onClick={() => handleSelect(tech)}
                  >
                    {tech.name}
                  </div>
                ))
              ) : (
                <div className={styles.noData}>Всі технології додані</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TechnologiesSection;
